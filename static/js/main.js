"use strict";

var movies;

var getMovies = function getMovies() {
  $.ajax({
    url: '/movies'
  }).done(function (data) {
    movies = data;
    console.log(movies);
  });
};

var substringMatcher = function substringMatcher(strs) {
  return function findMatches(q, cb) {
    var matches = [];
    var substrRegex = new RegExp(q, 'i');
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

getMovies();
$(function () {
  console.log(movies); // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/

  $('#typeahead-input .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  }, {
    name: 'states',
    source: substringMatcher(movies)
  });
});
//# sourceMappingURL=main.js.map