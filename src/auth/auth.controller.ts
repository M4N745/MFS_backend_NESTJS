import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from './user.entity';
import { NewUserDto } from './dto/new-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('/users')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async singUp(
    @Body() payload: NewUserDto,
  ): Promise<{ username: string; id: number }> {
    return this.authService.create(payload);
  }
  @Post('/auth')
  async singIn(
    @Body() payload: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.auth(payload);
  }
  @Get('/auth')
  @UseGuards(AuthGuard())
  async getUser(
    @GetUser() user: Users,
  ): Promise<{ username: string; id: number }> {
    const { id, username } = user;
    return { id, username };
  }
}
