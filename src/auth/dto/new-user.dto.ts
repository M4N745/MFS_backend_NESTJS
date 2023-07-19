import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Equal } from 'typeorm';

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 25)
  password: string;

  @IsNotEmpty()
  @IsString()
  repeat_password: string;
}
