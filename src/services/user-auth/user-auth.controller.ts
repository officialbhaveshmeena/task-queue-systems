import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Headers } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


// @UseGuards(JwtAuthGuard)
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

  @Get("verify")
  verifyToken(@Headers() headers:any) {
    if(!headers.authorization){
      return {status:400,message:"Token not found"}
    }
    let token = headers.authorization.split(" ")[1]
    if(!token){
      return {status:400,message:"Token not found"}
    }
    return this.userAuthService.verifyToken(token);
  }

}
