export class SearchMovieDTO {
  constructor(
    public imdbID: string,
    public title: string,
    public year: number,
    public poster: string,
  ) {}
}
