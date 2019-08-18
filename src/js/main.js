import typeadheadInitializer from './typeahead';
import * as GoogleMaps from './googlemaps';

let moviesList;
let moviesTitles;

const fetchMovies = () => $.ajax({ url: '/movies' });

const findMovie = (title) => moviesList[title];

$(() => {
  $.when(fetchMovies()).then((data) => {
    moviesList = data;
    moviesTitles = Object.keys(data).filter((word) => word !== '');

    typeadheadInitializer(moviesTitles);

    $('.tt-menu').on('click', '.tt-suggestion.tt-selectable', (el) => {
      const movieTitle = el.currentTarget.innerText;
      const movie = findMovie(movieTitle);
      $('window').trigger('maps.geolocator.add.marker', movie);
    });
  });
});
