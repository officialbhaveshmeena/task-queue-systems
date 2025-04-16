import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Image extends Document {
 
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  filename: string;

  @Prop()
  resizedPath: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  @Prop()
  errorMessage?: string;

  @Prop()
  bullJobId?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
