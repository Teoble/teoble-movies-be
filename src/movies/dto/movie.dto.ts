export class MovieDTO {
  constructor(
    public title: string,
    public year: number,
    public released: string,
    public genre: string,
    public director: string,
    public actors: string,
    public plot: string,
    public poster: string,
    public imdbRating: number,
    public imdbID: string,
    public website: string,
  ) {}
}
