import fs from 'fs';

export default class MoviesCsvParser {
  constructor() {
    this.moviesBuffer = this.getCsvData();
    this.movies = this.structureMovies();
  }

  structureMovies = () => {
    const movies = {};
    let csvHeader = [];

    this.moviesBuffer.forEach((movieData, index) => {
      if (index === 0) {
        csvHeader = movieData.split(',');
        return;
      }

      const movieDataParsed = movieData.split(',');
      const movieTitle = movieDataParsed[0];

      if (movies[movieTitle] === undefined) {
        movies[movieTitle] = {};
        movies[movieTitle].Locations = [];
      }

      for (let i = 0; i < csvHeader.length; i += 1) {
        if (csvHeader[i] === 'Locations') {
          movies[movieTitle].Locations.push(movieDataParsed[i]);
        } else if (csvHeader[i] !== 'Title') {
          movies[movieTitle][csvHeader[i]] = movieDataParsed[i];
        }
      }
    });
    return movies;
  };
}

MoviesCsvParser.prototype.getCsvData = () => fs.readFileSync('./misc/Film_Locations_in_San_Francisco.csv').toString().split('\n');
