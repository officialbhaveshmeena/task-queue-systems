import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class UploadService  {

    constructor(private readonly queueService:QueueService,private readonly dbService:DatabaseService){}
    async uploadFile(file: Express.Multer.File,userId: string) {
        // Implement your file handling logic here
       
        const {_id} = await this.dbService.createImage(file.filename,userId);
        
        let imageId = String(_id)
        console.log("--- image data ",imageId)
         this.queueService.addResizeJob(userId,file,imageId);
        return { message: 'File uploaded successfully!', file };
      }
}
