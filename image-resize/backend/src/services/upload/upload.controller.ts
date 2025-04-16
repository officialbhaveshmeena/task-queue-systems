import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { DatabaseService } from '../database/database.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService,private readonly dbService:DatabaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Request() req,@UploadedFile() file: Express.Multer.File) {
    console.log('req:', req.user);
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    this.uploadService.uploadFile(file,req.user.userId);
    return {
      originalname: file.originalname,
      filename: file.filename,
      // url: this.fileUploadService.getFileUrl(file.filename),
    };
  }

  @Post('all')
 async getAllFiles(@Request() req) {
    return await this.dbService.findAll(req.user.userId);
  }
}


