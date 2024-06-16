import { RequestError } from "src/types/RequestError";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./User";

export interface UserAdapterInterface {
    findAll: () => Promise<User[] | RequestError>
    find: (_id: string) => Promise<User | RequestError>
    findByUsername: (username: string) => Promise<User | RequestError>
    findByEmail: (email: string) => Promise<User | RequestError>
    save: (input: Omit<User, '_id'>) => Promise<User | RequestError>
    update: (_id: string, input: Partial<User>) => Promise<User | RequestError>
    remove: (_id: string) => Promise<User | RequestError>
}

@Injectable()
export class UserAdapter implements UserAdapterInterface {
    public constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {  }

    public async findAll(): Promise<User[] | RequestError> {
        try {
            return await this.userModel.find();
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async find(_id: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findById(_id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findByUsername(username: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findOne({ username });
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async findByEmail(email: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findOne({ email });
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<User, '_id'>): Promise<User | RequestError> {
        try {
            return await this.userModel.create(input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async update(_id: string, input: Partial<User>): Promise<User | RequestError> {
        try {
            return await this.userModel.findByIdAndUpdate(_id, input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(_id: string): Promise<User | RequestError> {
        try {
            return await this.userModel.findByIdAndDelete(_id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }
}