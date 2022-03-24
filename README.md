# Movies OMDb BFF

#### Description

In order to populate the OMDb FE application, we built this BFF in other to access OMDb API.

### Configuration

Create a `.env` file in root folder and add the variable `API_KEY` adding the key generated from [OMDb API](http://www.omdbapi.com/apikey.aspx)

```bash
API_KEY=<GENERATED_KEY>
```

### API

```bash
GET /movies/suggestions

Will get a list of movies titles suggested to perform a search

#Query Params
movie - string - The text that will be searched on OMDb API

#Response
[
  {
    "title": string
  },
  ...
]
```

```bash
GET /movies/search

Will get a list of movies according with the term searched

#Query Params
movie - string - The text that will be searched on OMDb API

#Response
[
  {
    "imdbID": number,
    "title": string,
    "year": number,
    "poster": string
  },
  ...
]
```

```bash
GET /movies/{imdbID}

Will get the details of a specific movie

#Params
imdbID - string - IMDB ID that is necessary to get movie details

#Response
{
  "title": string,
	"year": number,
	"released": string,
	"genre": string,
	"director": string,
	"actors": string,
	"plot": string,
	"poster": string,
	"imdbRating": number,
	"imdbID": string,
	"website": string
}
```

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

- Author - [Rafael Pereira](https://github.com/Teoble)

### License

Nest is [MIT licensed](LICENSE).
