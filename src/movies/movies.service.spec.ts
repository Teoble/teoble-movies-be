import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MovieDTO } from './dto/movie.dto';
import { SearchMovieDTO } from './dto/searchMovie.dto';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const createModule = async (mockHttpObject) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: mockHttpObject,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  };

  beforeEach(async () => createModule(mockHttpService));

  describe('Service creation', () => {
    it('should be defined', async () => {
      expect(service).toBeDefined();
    });
  });

  describe('Search Movies', () => {
    it('Should return a list of movies', () => {
      let returnMovies: SearchMovieDTO[];

      jest.spyOn(mockHttpService, 'get').mockReturnValue(
        of({
          data: require('../movies/mocks/search.json'),
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      const movies = service.searchMovie('anyMovie');

      movies.subscribe({
        next: (val) => (returnMovies = val),
        complete: () => {
          expect(returnMovies).toHaveLength(3);
        },
      });
    });
    it('Should throws exception for empty search', () => {
      jest.spyOn(mockHttpService, 'get').mockReturnValue(
        of({
          data: {
            Response: 'False',
            Error: 'Movie not found!',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      const movies = service.searchMovie('anyMovie');

      movies.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(HttpException);
        },
      });
    });
  });

  describe('Search Movies', () => {
    it('Should return a movie', () => {
      let returnMovie: MovieDTO;

      jest.spyOn(mockHttpService, 'get').mockReturnValue(
        of({
          data: require('../movies/mocks/movie.json'),
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      const movies = service.getMovie('anyId');

      movies.subscribe({
        next: (val) => (returnMovie = val),
        complete: () => {
          expect(returnMovie).toBeInstanceOf(MovieDTO);
          expect(returnMovie.title).toBe('Bat*21');
        },
      });
    });
    it('Should throws exception for a movie that does not exist', () => {
      jest.spyOn(mockHttpService, 'get').mockReturnValue(
        of({
          data: {
            Response: 'False',
            Error: 'Incorrect IMDb ID.',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

      const movies = service.getMovie('invalidId');

      movies.subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(HttpException);
        },
      });
    });
  });
});
