import { HydratedDocument } from "mongoose";
import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>

@Schema()
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
}

export const UserSchema = SchemaFactory.createForClass(User);