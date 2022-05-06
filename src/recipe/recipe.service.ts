import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Recipe, RecipeDocument } from './recipe.model';
import {
    NewRecipeInput,
    ListRecipeInput,
    UpdateRecipeInput,
  } from './recipe.inputs';


@Injectable()
export class RecipeService {

  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

  create(payload: NewRecipeInput) {
    const createdRecipe = new this.recipeModel(payload);
    return createdRecipe.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.recipeModel.findById(_id).exec();
  }

  list(filters: ListRecipeInput) {
    return this.recipeModel.find({ ...filters }).exec();
  }

  update(payload: UpdateRecipeInput) {
    return this.recipeModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.recipeModel.findByIdAndDelete(_id).exec();
  }
}
