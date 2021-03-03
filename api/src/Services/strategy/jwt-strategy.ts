import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../authentication.service';
import { jwtConstants } from 'src/Constant/secret';
import { JWTPayload } from 'src/Common/DTOs/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.authService.findUserByName(payload.username);

    if (!user) {
      return;
    }

    if (user.banEndDate && user.banEndDate.valueOf() > Date.now()) {
      return;
    }

    return user;
  }



}
