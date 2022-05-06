import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Recipe, RecipeDocument } from './recipe.model';
import { RecipeService } from './recipe.service';
import {
  NewRecipeInput,
  ListRecipeInput,
  UpdateRecipeInput,
} from './recipe.inputs';

import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(() => Recipe)
  async recipe(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<Recipe> {
    return this.recipeService.getById(_id);
  }

  @Query(() => [Recipe])
  async recipes(
    @Args('filters', { nullable: true }) filters?: ListRecipeInput,
  ): Promise<Recipe[]> {
    return this.recipeService.list(filters);
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Args('payload') payload: NewRecipeInput,
  ): Promise<Recipe> {

    const recipe = await this.recipeService.create(payload);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Args('payload') payload: UpdateRecipeInput,
  ): Promise<Recipe> {
    
    const recipe = await this.recipeService.update(payload);
    pubSub.publish('recipeUpdated', { recipeUpdated: recipe });
    return recipe;
  }

  @Mutation(() => Recipe)
  async deleteRecipe(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.recipeService.delete(_id);
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }

  @Subscription(() => Recipe)
  recipeUpdated() {
    return pubSub.asyncIterator('recipeUpdated');
  }
}
