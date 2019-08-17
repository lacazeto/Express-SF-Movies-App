let moviesList;
let moviesTitles;

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

const getMovies = () => $.ajax({ url: '/movies' });

$(() => {
  $.when(getMovies()).then((data) => {
    moviesList = data;
    moviesTitles = Object.keys(data).filter((word) => word !== '');
    console.log(data, moviesTitles);
    // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/
    $('#the-basics .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: 'moviesTitles',
      source: substringMatcher(moviesTitles),
    });
  });
});
