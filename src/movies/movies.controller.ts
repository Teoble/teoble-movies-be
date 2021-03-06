import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/suggestions')
  suggestMovieTitles(@Query() query) {
    const suggestions = this.moviesService.searchSuggestions(query.movie);
    return suggestions;
  }

  @Get('/search')
  searchMovie(@Query() query) {
    const movies = this.moviesService.searchMovie(query.movie);
    return movies;
  }

  @Get(':imdbID')
  getMovie(@Param('imdbID') imdbID) {
    const movie = this.moviesService.getMovie(imdbID);
    return movie;
  }
}
