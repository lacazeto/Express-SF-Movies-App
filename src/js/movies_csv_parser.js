import fs from 'fs';

export default class MoviesCsvParser {
  constructor() {
    this.moviesBuffer = this.getData();
    this.movies = this.structureMovies();
  }

  structureMovies = () => {
    const movies = {};
    this.moviesBuffer.forEach((movieData) => {
      const movieDataParsed = movieData.split(',');
      const movieTitle = movieDataParsed[0];
      movies[movieTitle].movieRelease = movieDataParsed[1];
      movies[movieTitle].movieLocation = movieDataParsed[2];
      movies[movieTitle].movieFunFact = movieDataParsed[3];
      movies[movieTitle].movieProduction = movieDataParsed[4];
      movies[movieTitle].movieDistributor = movieDataParsed[5];
      movies[movieTitle].movieDirector = movieDataParsed[6];
      movies[movieTitle].movieWriter = movieDataParsed[7];
      movies[movieTitle].movieActor1 = movieDataParsed[8];
      movies[movieTitle].movieActor2 = movieDataParsed[9];
      movies[movieTitle].movieActor3 = movieDataParsed[10];
    });
  };
}

MoviesCsvParser.prototype.getData = () => fs.readFileSync('./misc/Film_Locations_in_San_Francisco.csv').toString().split('\n');
