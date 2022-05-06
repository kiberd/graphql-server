import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';

import { PersonModule } from './person/person.module';
import { HobbyModule } from './hobby/hobby.module';
import { RecipeModule } from './recipe/recipe.module';

import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todos'),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        // dateScalarMode: 'timestamp',
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },

      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/subscriptions',
        },
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
    }),

    // PersonModule,
    // HobbyModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
