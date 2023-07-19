import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from './dto/new-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async create(payload: NewUserDto): Promise<{ username: string; id: number }> {
    const { username, password, repeat_password } = payload;

    if (repeat_password !== password) {
      throw new UnprocessableEntityException('Slaptažodžiai nesutampa.');
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashPassword,
    });

    try {
      await this.userRepository.save(user);
      return { username: user.username, id: user.id };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Prisijungimo vardas užimtas.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async auth(payload: AuthCredentialsDto): Promise<{ token: string }> {
    const { username, password } = payload;

    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const jwt = { username };
      const accessToken = this.jwtService.sign(jwt);

      return { token: accessToken };
    }
    throw new UnauthorizedException('Neteisingi prisijungimo duomenys.');
  }
}
