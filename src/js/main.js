import typeadheadInitializer from './typeahead';

let moviesList;
let moviesTitles;

const getMovies = () => $.ajax({ url: '/movies' });

$(() => {
  $.when(getMovies()).then((data) => {
    moviesList = data;
    moviesTitles = Object.keys(data).filter((word) => word !== '');

    typeadheadInitializer(moviesTitles);
  });
});
