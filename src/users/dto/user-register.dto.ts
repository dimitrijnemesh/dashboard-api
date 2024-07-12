import { IsEmail, IsString } from "class-validator"

export class UserRegisterDto{
    @IsEmail({},{message: "Wrong email addres"})
    email: string

    @IsString({message: "Password not found"})
    password: string

    @IsString({message: "Name not found"})
    name: string
}