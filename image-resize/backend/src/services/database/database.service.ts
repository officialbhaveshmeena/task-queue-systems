import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { stat } from 'fs';
import { Model } from 'mongoose';
import { Image } from 'src/schemas/image.schema';

@Injectable()
export class DatabaseService {
      constructor(@InjectModel(Image.name) private imageModel: Model<Image>,) { }

      async createImage(filename: string,userId: string) {
        const newImage = new this.imageModel({
          user:userId,
          filename,
          status: 'pending',
        });
    
        return newImage.save(); // creates a document in MongoDB
      }
    
      async updateStatus(userId:string,filename: string, status: string,resizedPath:string) {
        return this.imageModel.findOneAndUpdate(
          {user:userId, filename },
          { $set:{status,resizedPath:resizedPath} },
          { new: true },
        );
      }
    
      async findAll(userId: string) {
        const images = await this.imageModel.find({user:userId},{}).sort({}).sort({ createdAt: -1 }).exec()
        return images.map((image) => {
          return {
            id:image._id,
            filename:image.filename,
            resizedPath:"http://localhost:"+4000+"/uploads/"+image.resizedPath,
            // outputPath:image.outputPath,
              status:image.status
          };
        });
      }

       async deleteImage(userId: string,id:string) {
        return await this.imageModel.deleteOne({user:userId,_id:id}).exec()
       
      }

      

      
    
}
