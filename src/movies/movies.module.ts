import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    HttpModule.register({
      baseURL: `http://www.omdbapi.com`,
    }),
  ],
})
export class MoviesModule {}
