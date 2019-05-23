// Julien Bigras + Soo Y Shim – Project 4

//Pseudo Code



// - create an app namespace called movieApp that will hold all methods
const movieApp = {};

// - collect user input: there will be a number input, and user will type in a year (there will be error handling to ensure that user types in a valid year) TYPE YEAR or TYPE DATE or number and assign a range
// - save user input to variable- make AJAX request with variable representing user input


movieApp.userSubmission = function() {
  $('input[type=submit]').on('click', function(e) {
    e.preventDefault();
    const userInput = $('input[type=number]').val();

    movieApp.getMovies(userInput);
  });
};

// Make an ajax call to Movie API
// - “primary_release_year” is the parameter of the query
movieApp.url = 'https://api.themoviedb.org/3/discover/movie';
movieApp.configUrl = 'https://api.themoviedb.org/3/configuration';
movieApp.key = "852b1b7792f98b1e44b5aa474ea2ed2b";

movieApp.getMovies = function(userInput) {
  movieApp.ajaxCall = $.ajax({
    url: movieApp.url,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: movieApp.key,
      primary_release_year: userInput,
      sort_by: "vote_count.desc"
      //by default, data is sorted by descending order of popularity in the API
    }
  })
  
  movieApp.getPosters =
  $.ajax({
    url: movieApp.configUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: movieApp.key
    }
  });

  $.when(movieApp.ajaxCall, movieApp.getPosters)
    .then(function (data1, data2) {
      const movies = data1[0];
      const posterConfig = data2[0];

      console.log(movies, posterConfig);

    })
}



  // .then(function(movies){ 
  //   $('.movieInfo').empty();
  //   let userMovie = movies.results[0];
  //   movieApp.displayMovie(userMovie)
  //   console.log(userMovie);
  // }); 

  // movieApp.getPosters.then(function(configData) {
  //   const baseUrl = configData.images.base_url;
  //   //poster width of 500px
  //   const posterSize = configData.images.poster_sizes[4];
  //   console.log(posterSize);
  // })

// movieApp.getPosters();


// - display the data on the page- jquery append movie name and other basic movie info to a previously hidden section, which we will auto-scroll to
movieApp.displayMovie = function(movie) {
  const $movieTitle = $('<h2>').text(movie.title);
  const $voteCount = $('<p>').text(movie.vote_count);
  const $voteAverage = $('<p>').text(movie.vote_average);
  const $overview = $('<p>').text(movie.overview);
  $('.movieInfo').append($movieTitle, $voteCount, $voteAverage, $overview);
}

// - create an init to start movieApp, which will initiate on “click” of submit button

movieApp.init = function() {
  movieApp.userSubmission();
}

//document ready
$(function() {
  movieApp.init();
});