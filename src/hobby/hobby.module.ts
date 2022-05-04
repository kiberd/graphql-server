import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hobby, HobbySchema } from './hobby.model';
import { HobbyResolver } from './hobby.resolver';
import { HobbyService } from './hobby.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hobby.name, schema: HobbySchema }]),
  ],
  providers: [HobbyResolver, HobbyService],
})
export class HobbyModule {}
