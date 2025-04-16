import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { DatabaseService } from '../database/database.service';


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService,private readonly dbService:DatabaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    this.uploadService.uploadFile(file);
    return {
      originalname: file.originalname,
      filename: file.filename,
      // url: this.fileUploadService.getFileUrl(file.filename),
    };
  }

  @Post('all')
 async getAllFiles() {
    return await this.dbService.findAll();
  }
}


