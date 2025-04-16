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
    
      async updateStatus(filename: string, status: string) {
        return this.imageModel.findOneAndUpdate(
          { filename },
          { status },
          { new: true },
        );
      }
    
      async findAll(userId: string) {
        const images = await this.imageModel.find({user:userId},{_id:0,filename:1,status:1}).lean().exec()
        return images.map((image) => {
          return {
            filename:image.filename,
              event:image.status
          };
        });
      }

      
    
}
