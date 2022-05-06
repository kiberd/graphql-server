import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Recipe, RecipeSchema, RecipeDocument } from './recipe.model';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { DateScalar } from '../common/scalars/date.scalar';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipeResolver, RecipeService, DateScalar],
})
export class RecipeModule {}
