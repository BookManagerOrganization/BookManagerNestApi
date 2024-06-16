import { RequestError } from "src/types/RequestError";
import { UserAdapterInterface } from "./UserAdapter";
import { CreateUserDto } from "./dto/CreateUserDto";
import { TokenProviders } from "src/TokenProviders";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { GetUserDto } from "./dto/GetUserDto";
import { User } from "./User";
import {
    Inject,
    Injectable
} from "@nestjs/common";

export interface UserServiceInterface {
    findAll: () => Promise<GetUserDto | RequestError>
    find: (_id: string) => Promise<User | RequestError>
    findByUsername: (username: string) => Promise<User | RequestError>
    findByEmail: (email: string) => Promise<User | RequestError>
    save: (input: CreateUserDto) => Promise<User | RequestError>
    update: (_id: string, input: UpdateUserDto) => Promise<User | RequestError>
    remove: (_id: string) => Promise<User | RequestError>
}

@Injectable()
export class UserService implements UserServiceInterface {
    public constructor(
        @Inject(TokenProviders.USER_ADAPTER)
        private readonly adapter: UserAdapterInterface
    ) {  }

    public async findAll(): Promise<GetUserDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            users: data
        }
    }

    public async find(_id: string): Promise<User | RequestError> {
        return await this.adapter.find(_id);
    }

    public async findByUsername(username: string): Promise<User | RequestError> {
        return await this.adapter.findByUsername(username);
    }

    public async findByEmail(email: string): Promise<User | RequestError> {
        return await this.adapter.findByEmail(email);
    }

    public async save(input: CreateUserDto): Promise<User | RequestError> {
        return await this.adapter.save({
            ...input,
            admin: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    public async update(_id: string, input: UpdateUserDto): Promise<User | RequestError> {
        return await this.adapter.update(
            _id,
            { ...input, updatedAt: new Date() }
        );
    }

    public async remove(_id: string): Promise<User | RequestError> {
        return await this.adapter.remove(_id);
    }
}