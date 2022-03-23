import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as expectedSearch from './responses/search.json';
import * as expectedMovie from './responses/movie.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /movies/search', () => {
    it('Success search', () => {
      return request(app.getHttpServer())
        .get('/movies/search?movie=Forrest Gump')
        .expect(200)
        .expect(expectedSearch);
    });

    it('Failed search', () => {
      return request(app.getHttpServer())
        .get('/movies/search?movie=ascascsaccsa')
        .expect(404);
    });
  });

  describe('GET /movies/:id', () => {
    it('Success search', () => {
      return request(app.getHttpServer())
        .get('/movies/tt0094712')
        .expect(200)
        .expect(expectedMovie);
    });

    it('Failed search', () => {
      return request(app.getHttpServer())
        .get('/movies/search?movie=ascascsaccsa')
        .expect(404);
    });
  });
});
