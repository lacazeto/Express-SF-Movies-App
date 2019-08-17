(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* import Movies from './movies';

const movies = new Movies(); */
var moviesList;
var moviesTitles;

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

var getMovies = function getMovies() {
  return $.ajax({
    url: '/movies'
  });
};

$(function () {
  $.when(getMovies()).then(function (data) {
    moviesList = data;
    moviesTitles = Object.keys(data).filter(function (word) {
      return word !== '';
    });
    console.log(data, moviesTitles); // Using typeahead, more can be found here: https://twitter.github.io/typeahead.js/examples/

    $('#the-basics .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'moviesTitles',
      source: substringMatcher(moviesTitles)
    });
  });
});

},{}]},{},[1]);
