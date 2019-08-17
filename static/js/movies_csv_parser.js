"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MoviesCsvParser = function MoviesCsvParser() {
  var _this = this;

  _classCallCheck(this, MoviesCsvParser);

  _defineProperty(this, "structureMovies", function () {
    var movies = {};
    var csvHeader = [];

    _this.moviesBuffer.forEach(function (movieData, index) {
      if (index === 0) {
        csvHeader = movieData.split(',');
        return;
      }

      var movieDataParsed = movieData.split(',');
      var movieTitle = movieDataParsed[0];

      if (movies[movieTitle] === undefined) {
        movies[movieTitle] = {};
        movies[movieTitle].Locations = [];
      }

      for (var i = 0; i < csvHeader.length; i += 1) {
        if (csvHeader[i] === 'Locations') {
          movies[movieTitle].Locations.push(movieDataParsed[i]);
        } else if (csvHeader[i] !== 'Title') {
          movies[movieTitle][csvHeader[i]] = movieDataParsed[i];
        }
      }
    });

    return movies;
  });

  this.moviesBuffer = this.getCsvData();
  this.movies = this.structureMovies();
};

exports["default"] = MoviesCsvParser;

MoviesCsvParser.prototype.getCsvData = function () {
  return _fs["default"].readFileSync('./misc/Film_Locations_in_San_Francisco.csv').toString().split('\n');
};
//# sourceMappingURL=movies_csv_parser.js.map