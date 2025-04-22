import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class UserAuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private jwtService: JwtService) {}

  async register(data:any){
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({
      username: data.username,
      email: data.email,
      password: hashPassword,
    })
    return user.save();
  }

 async login(data:any){
    
    let findUser = await this.userModel.findOne({email:data.email})
    if(!findUser){
      return {status:400,message:"User not found"}
    }
    let comparePassword = bcrypt.compare(data.password, findUser?.password)
    if(!comparePassword){
      return {status:400,message:"Password not matched"}
    }
    const payload = { sub: findUser._id, username: findUser.username,email:findUser.email };
    const token = await this.jwtService.signAsync(payload);
    return {  username:findUser.username,email:data.email, token: token };

  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
