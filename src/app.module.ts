import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './services/upload/upload.module';
import { QueueModule } from './services/queue/queue.module';
import { PubsubService } from './services/pubsub/pubsub.service';
import { WebsocketGateway } from './services/websocket/websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './services/database/database.module';
import { UserAuthModule } from './services/user-auth/user-auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/imagequeue'),UploadModule, QueueModule, DatabaseModule, UserAuthModule],
  controllers: [AppController],
  providers: [AppService, PubsubService, WebsocketGateway],
})
export class AppModule {}
