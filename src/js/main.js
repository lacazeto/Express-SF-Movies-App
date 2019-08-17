import * as $ from 'jquery';
import MoviesCsvParser from './movies_csv_parser';

const moviesTitles = [];

$(() => {
  const moviesCsvParser = new MoviesCsvParser();
  const { movies } = moviesCsvParser;
  console.log(movies);
});
