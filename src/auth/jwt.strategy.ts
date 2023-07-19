import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Vis dar nezinau, kaip naudot .env, nenaudojant
      // process.env.JWT_SECRET
      secretOrKey: 'very_secret',
    });
  }

  async validate(payload: { username: string }): Promise<Users> {
    const { username } = payload;
    const user: Users | null = await this.userRepository.findOneBy({
      username,
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
