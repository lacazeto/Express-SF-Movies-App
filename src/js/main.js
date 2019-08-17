let movies;

const getMovies = (() => {
  $.ajax({
    url: '/movies',
  }).done((data) => {
    movies = data;
    console.log(movies);
  });
});

const substringMatcher = (strs) => function findMatches(q, cb) {
  const matches = [];
  const substrRegex = new RegExp(q, 'i');
  $.each(strs, (i, str) => {
    if (substrRegex.test(str)) {
      matches.push(str);
    }
  });

  cb(matches);
};

getMovies();

$(() => {
  console.log(movies);
  // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/
  $('#typeahead-input .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
  },
  {
    name: 'states',
    source: substringMatcher(movies),
  });
});
