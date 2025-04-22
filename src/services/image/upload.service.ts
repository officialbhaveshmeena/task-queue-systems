import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class UploadService  {

    constructor(private readonly queueService:QueueService,private readonly dbService:DatabaseService){}
    async uploadFile(file: Express.Multer.File,userId: string) {
        // Implement your file handling logic here
       const {_id}:any=await this.dbService.createImage(file.filename,userId);
       await this.queueService.addResizeJob(file,userId, _id.toString());
        return { message: 'File uploaded successfully!', file };
      }
}
