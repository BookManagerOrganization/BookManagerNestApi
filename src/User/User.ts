import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ collection: "User" })
export class User {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    @Prop()
    username: string;

    @ApiProperty({ type: String })
    @Prop()
    email: string;
   
    @ApiProperty({ type: String })
    @Prop()
    password: string;

    @ApiProperty({ type: Boolean })
    @Prop()
    admin: boolean;
   
    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
   
    @ApiProperty({ type: Date })
    @Prop()
    updatedAt: Date;

    public constructor(user?: Partial<User>) {
        this._id = user?._id;
        this.username = user?.username;
        this.email = user?.email;
        this.password = user?.password;
        this.admin = user?.admin;
        this.createdAt = user?.createdAt;
        this.updatedAt = user?.updatedAt;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);