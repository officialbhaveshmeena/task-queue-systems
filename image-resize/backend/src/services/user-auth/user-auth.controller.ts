import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post("signup")
  signUp(@Body() createUserAuthDto: any) {
    return this.userAuthService.register(createUserAuthDto);
  }
  @Post("login")
  login(@Body() createUserAuthDto: any) {
    return this.userAuthService.login(createUserAuthDto);
  }

}
