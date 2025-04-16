// src/upload/schemas/image.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
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
