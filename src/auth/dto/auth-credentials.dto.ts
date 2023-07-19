import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 35)
  password: string;
}
