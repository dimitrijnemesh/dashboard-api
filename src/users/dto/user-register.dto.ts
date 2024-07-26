import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email addres' })
	@IsNotEmpty()
	email: string;

	@IsString({ message: 'Password not found' })
	@IsNotEmpty()
	password: string;

	@IsString({ message: 'Name not found' })
	@IsNotEmpty()
	name: string;
}
