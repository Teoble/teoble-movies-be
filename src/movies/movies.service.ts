import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SearchMovieDTO } from './dto/searchMovie.dto';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  private apiKeyURL = `?apikey=${process.env.API_KEY}`;
  private searchUrl = `${this.apiKeyURL}&type=movie`;
  private movieUrl = `${this.apiKeyURL}&plot=full`;

  constructor(private httpService: HttpService) {}

  searchMovie(movie: string): Observable<SearchMovieDTO[]> {
    let searchObject = new SearchMovieDTO();
    return this.httpService.get(`${this.searchUrl}&s=${movie}`).pipe(
      map((response) => {
        const movies = response.data.Search;
        if (movies)
          return movies.map((movie) => {
            searchObject = {
              ...movie,
            };
            console.log(Object.keys(searchObject));
            return searchObject;
          });
        else throw new HttpException('Movie not found', 404);
      }),
    );
  }

  getMovie(imdbID: string): Observable<MovieDTO> {
    return this.httpService.get(`${this.movieUrl}&i=${imdbID}`).pipe(
      map((response) => {
        const movie = response.data;
        if (movie) {
          const mappedMovie: MovieDTO = {
            ...movie,
          };
          return mappedMovie;
        } else throw new HttpException('Movie not found', 404);
      }),
    );
  }
}
