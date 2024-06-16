import { TokenProviders } from "src/TokenProviders";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./UserController";
import { UserAdapter } from "./UserAdapter";
import { UserService } from "./UserService";
import { Module } from "@nestjs/common";
import {
    User,
    UserSchema
} from "./User";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [ UserController ],
    providers: [
        {
            provide: TokenProviders.USER_ADAPTER,
            useClass: UserAdapter
        },
        {
            provide: TokenProviders.USER_SERVICE,
            useClass: UserService
        },
    ]
})
export class UserModule {  }