(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeAddress = exports.initMap = void 0;
var _window = window,
    map = _window.map;

var initMap = function initMap() {
  /* codeAddress(address); */
};

exports.initMap = initMap;

var codeAddress = function codeAddress(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: address
  }, function (results, status) {
    console.log(results);
    var latLng = {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    };
    console.log(latLng);

    if (status == 'OK') {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      console.log(map);
    } else {
      console.error("Geocode was not successful for the following reason: ".concat(status));
    }
  });
};

exports.codeAddress = codeAddress;
},{}],2:[function(require,module,exports){
"use strict";

var _typeahead = _interopRequireDefault(require("./typeahead"));

var GoogleMaps = _interopRequireWildcard(require("./googlemaps"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moviesList;
var moviesTitles;

var fetchMovies = function fetchMovies() {
  return $.ajax({
    url: '/movies'
  });
};

var findMovie = function findMovie(title) {
  return moviesList[title];
};

$(function () {
  $.when(fetchMovies()).then(function (data) {
    moviesList = data;
    moviesTitles = Object.keys(data).filter(function (word) {
      return word !== '';
    });
    (0, _typeahead["default"])(moviesTitles);
    $('.tt-menu').on('click', '.tt-suggestion.tt-selectable', function (el) {
      var movieTitle = el.currentTarget.innerText;
      var movie = findMovie(movieTitle);
      console.log(movie);
      $('window').trigger('maps.geolocator.add.marker', movie);
    });
  });
});
},{"./googlemaps":1,"./typeahead":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var typeadheadInitializer = function typeadheadInitializer(availableOptions) {
  // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/
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

  $('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  }, {
    name: 'moviesTitles',
    source: substringMatcher(availableOptions)
  });
};

var _default = typeadheadInitializer;
exports["default"] = _default;
},{}]},{},[2]);
