import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from 'src/schemas/image.schema';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
      DatabaseModule,
    ],
  providers: [QueueService],
   exports: [QueueService],
})
export class QueueModule {}
