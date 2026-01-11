const numberOfFilms = prompt('How many films have you watched?', '')

const personalMovieDatabase = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
}

const a = prompt('One of the last movies you watched?', ''),
  b = prompt('How much would you rate it?', ''),
  c = prompt('One of the last movies you watched?', ''),
  d = prompt('How much would you rate it?', '')

personalMovieDatabase.movies[a] = b
personalMovieDatabase.movies[c] = d

console.log(personalMovieDatabase)
