import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_secret', // use hardcoded secret if not using config
    });
  }

  async validate(payload: any) {
    // This payload is what you signed in login (e.g., { sub: user._id, username: user.username })
    return { userId: payload.sub, username: payload.username };
  }
}
