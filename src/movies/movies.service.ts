import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SearchMovieDTO } from './dto/searchMovie.dto';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  private _apiKeyURL: string;

  constructor(private httpService: HttpService) {
    this._apiKeyURL = `?apikey=${process.env.API_KEY}`;
  }

  searchMovie(movie: string): Observable<SearchMovieDTO[]> {
    return this.httpService
      .get(`${this._apiKeyURL}&type=movie&s=${movie}`)
      .pipe(
        map((response) => {
          const movies = response.data.Search;
          if (movies)
            return movies.map(
              (movie: any) =>
                new SearchMovieDTO(
                  movie.imdbID,
                  movie.Title,
                  parseInt(movie.Year),
                  movie.Poster,
                ),
            );
          else
            throw new HttpException(
              'It was not possible to find any movie',
              404,
            );
        }),
      );
  }

  getMovie(
    imdbID: string,
    plot: 'short' | 'full' = 'full',
  ): Observable<MovieDTO> {
    return this.httpService
      .get(`${this._apiKeyURL}&plot=${plot}&i=${imdbID}`)
      .pipe(
        map((response) => {
          const movie = response.data;
          if (!movie.Error)
            return new MovieDTO(
              movie.Title,
              parseInt(movie.Year),
              movie.Released,
              movie.Genre,
              movie.Director,
              movie.Actors,
              movie.Plot,
              movie.Poster,
              parseFloat(movie.imdbRating),
              movie.imdbID,
              movie.Website,
            );
          else throw new HttpException('Movie not found', 404);
        }),
      );
  }
}
