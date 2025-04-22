import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { join, resolve } from 'path';
import * as sharp from 'sharp';
import { createClient } from 'redis';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class QueueService implements OnModuleInit {
  constructor(private readonly dbService: DatabaseService) { }
  private resizeQueue: Queue;
  async onModuleInit() {
    const connection = {
      host: 'localhost',
      port: 6379,
    }

    const pub = createClient({ url: 'redis://localhost:6379' });
    await pub.connect();
    this.resizeQueue = new Queue('image-resize', {
      connection: connection,
    });
    const resizeWorker = new Worker('image-resize', async (job) => {
      const { filename, inputPath, resizedPath, userId, resizedFullPath, _id } = job.data;
      await pub.publish('image-events', JSON.stringify({
        status: 'started',
        filename,
        resizedPath,
        _id
      }));
      try {
        // Use sharp to resize the image
        await new Promise((resolve, reject) => {

          setTimeout(() => { resolve(1) }, 3500); // Simulate a delay for the job processing
        })
        await sharp(inputPath)
          .resize(800, 600) // Example dimensions
          .toFile(resizedFullPath);

        await this.dbService.updateStatus(filename, 'completed', resizedPath, userId);
        await pub.publish('image-events', JSON.stringify({
          status: 'completed',
          filename,
          resizedPath,
          _id
        }));
        return { success: true, resizedPath };
      } catch (error) {
        await this.dbService.updateStatus(filename, 'failed', null, userId,);
        await pub.publish('image-events', JSON.stringify({
          status: 'failed',
          filename,
          resizedPath,
          _id
        }));
        console.error('Error resizing image:', error);
        throw error; // Ensure the job fails if there's an error
      }

    }, {
      connection: {
        host: 'localhost',
        port: 6379,
      },
      concurrency: 2, // Process 2 jobs simultaneously
      autorun: true,
    });

    // Add event listeners for worker
    resizeWorker.on('completed', (job) => {
      // console.log(`Job ${job?.id} completed successfully`);
    });

    resizeWorker.on('failed', (job, err) => {
      // console.error(`Job ${job?.id} failed with error:`, err);
    });

  }

  async addResizeJob(file: any, userId: string, id: string) {
    const jobData: any = {
      filename: file.filename,
      inputPath: join(resolve('.'), file.destination, file.filename),
      resizedFullPath: join(resolve('.'), file.destination, `resized-${file.filename}`),
      resizedPath: `resized-${file.filename}`,
      userId,
      _id: id,
    };

    await this.resizeQueue.add('resize', jobData);
    // console.log('Job added to queue:', jobData, resolve('.'));
  }
}
