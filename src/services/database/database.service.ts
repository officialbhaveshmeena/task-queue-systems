import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { stat } from 'fs';
import { Model } from 'mongoose';
import { Image, ImageDocument } from 'src/schemas/image.schema';

@Injectable()
export class DatabaseService {
      constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>,) { }

      async createImage(filename: string) {
        const newImage = new this.imageModel({
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
    
      async findAll() {
        const images = await this.imageModel.find({},{_id:0,filename:1,status:1}).lean().exec()
        return images.map((image) => {
          return {
            filename:image.filename,
              event:image.status
          };
        });
      }
    
}
