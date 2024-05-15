import { IsEmail } from 'class-validator'
export class CreateUserDto {
  name: string
  surname: string
  @IsEmail()
  email: string
  password: string
  avatar: string
  bio: string
}
