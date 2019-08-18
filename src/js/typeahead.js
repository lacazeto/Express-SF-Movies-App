const typeadheadInitializer = (availableOptions) => {
  // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/
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

  $('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
  },
  {
    name: 'moviesTitles',
    source: substringMatcher(availableOptions),
  });
};

export default typeadheadInitializer;
