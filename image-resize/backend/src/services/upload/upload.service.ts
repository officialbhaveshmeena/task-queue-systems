import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class UploadService  {

    constructor(private readonly queueService:QueueService,private readonly dbService:DatabaseService){}
    uploadFile(file: Express.Multer.File,userId: string) {
        // Implement your file handling logic here
        this.queueService.addResizeJob(file);
        this.dbService.createImage(file.filename,userId);
        return { message: 'File uploaded successfully!', file };
      }
}
