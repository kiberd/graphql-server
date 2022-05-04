import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({required: true})
    date: Date;

    @Prop()
    todoTitle: string;

    @Prop()
    todoDescription: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);