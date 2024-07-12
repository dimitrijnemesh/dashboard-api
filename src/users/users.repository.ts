import { UserModel } from "@prisma/client";
import { User } from "./user.entity";
import { IUsersReposetory } from "./users.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { PrismaService } from "../database/prisma.service";

@injectable()
export class UsersRepository implements IUsersReposetory{
    constructor(@inject(TYPES.PrismaService) private prismaService : PrismaService){}
    async create({email, password, name}: User): Promise<UserModel>{
        return this.prismaService.client.userModel.create({
            data:{
                email: email,
                password: password,
                name: name 
            }
        })
    };
    async find(email:string): Promise<UserModel | null>{
        return this.prismaService.client.userModel.findFirst({
           where: {
            email, 
           }
        })
    }
}