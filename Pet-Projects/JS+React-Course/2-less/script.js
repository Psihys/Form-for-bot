const numberOfFilms = prompt('How many films have you watched?', '')

const personalMovieDatabase = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
}

for (let i = 0; i < 2; i++) {
  const a = prompt('One of the last movies you watched?', ''),
    b = prompt('How much would you rate it?', '')

  if (a != null && b != null && a != '' && b != '' && a.length < 50) {
    personalMovieDatabase.movies[a] = b
    console.log('done')
  } else {
    i--
    console.log('error')
  }
  personalMovieDatabase.movies[a] = b
}

if (personalMovieDatabase.count < 10) {
  console.log("You've watched quite a few movies")
} else if (
  personalMovieDatabase.count >= 10 &&
  personalMovieDatabase.count < 30
) {
  console.log('You are a classic viewer')
} else if (personalMovieDatabase.count >= 30) {
  console.log('You are a movie buff')
} else {
  console.log('Error')
}

console.log(personalMovieDatabase)
