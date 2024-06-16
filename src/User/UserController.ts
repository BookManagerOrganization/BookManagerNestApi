import { RequestError } from "src/types/RequestError";
import { UserServiceInterface } from "./UserService";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { TokenProviders } from "src/TokenProviders";
import { User } from "./User";
import {
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    Patch,
    Post,
    ValidationPipe
} from "@nestjs/common";

import { GetUserDto } from "./dto/GetUserDto";

@Controller("/user")
@ApiTags("User")
export class UserController {
    public constructor(
        @Inject(TokenProviders.USER_SERVICE)
        private readonly service: UserServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetUserDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getAll(): Promise<GetUserDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async get(
        @Param("id") _id: string
    ): Promise<User | RequestError> {
        return await this.service.find(_id);
    }

    @Get("/username/:username")
    @ApiParam({
        name: "username",
        type: String
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getByUsername(
        @Param("username") username: string
    ): Promise<User | RequestError> {
        return await this.service.findByUsername(username);
    }

    @Get("/username/:email")
    @ApiParam({
        name: "email",
        type: String
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getByEmail(
        @Param("email") email: string
    ): Promise<User | RequestError> {
        return await this.service.findByEmail(email);
    }

    @Post("/")
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(201)
    public async post(
        @Body(new ValidationPipe()) input: CreateUserDto
    ): Promise<User | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateUserDto })
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(201)
    public async patch(
        @Param("id") _id: string,
        @Body(new ValidationPipe()) input: UpdateUserDto
    ): Promise<User | RequestError> {
        return await this.service.update(_id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: "id",
        type: String
    })
    @ApiResponse({
        status: 204,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(204)
    public async delete(
        @Param("id") _id: string
    ): Promise<User | RequestError> {
        return await this.service.remove(_id);
    }
}