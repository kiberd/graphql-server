import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class NewRecipeInput {

  @Field(() => String)
  @MaxLength(30)
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];

}

@InputType()
export class ListRecipeInput {

    @Field(() => String, { nullable: true })
    _id?: MongooseSchema.Types.ObjectId;

    @Field(() => String, { nullable: true})
    @MaxLength(30)
    title?: MongooseSchema.Types.ObjectId;
  
    @Field(() => String, { nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;
  
    @Field(() => [String], { nullable: true })
    ingredients?: string[];

}

@InputType()
export class UpdateRecipeInput {

    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => String)
    @MaxLength(30)
    title?: MongooseSchema.Types.ObjectId;
  
    @Field(() => String, { nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;
  
    @Field(() => [String], { nullable: true })
    ingredients?: string[];

}