import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';



@ObjectType({ description: 'recipe' })
@Schema()
export class Recipe {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Date)
  @Prop({ type: Date, default: Date.now() })
  creationDate: Date;

  @Field(() => String)
  @Prop()
  @Directive('@upper')
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description?: string;

  @Field(() => [String])
  @Prop()
  ingredients: string[];
}

export type RecipeDocument = Recipe & Document;

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
