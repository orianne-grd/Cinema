const TMDB_API_KEY = "9d56dfe3373c2d3a95a94d1f33ebd01d";
const searchURL = "https://api.themoviedb.org/3/search/movie"
const posterPath = "https://image.tmdb.org/t/p/original"
const language = "fr-FR";


async function searchMovie() {
  console.log("test")
  var movieName = document.movieForm.movieName.value;
  console.log(movieName)
  if(movieName) {
    var data = await getData(movieName)
    console.log(data);
    var list = getMovieList(data.results);
    console.log(list);  
    displayMovieList(list);
  }
}

/**
   * Get Data from TMDB
   * @param {*} type movie or tv 
   * @param {*} id of the show on TMDB
   * @returns the data if successful
   */
 async function getData(name) {
  var url_params = searchURL + "?api_key=" + TMDB_API_KEY + "&language=" + language + "&query=" + name;
  const response = await fetch(url_params);
  if (response) {
    var data = await response.json();
    return data;
  } else {
    return undefined;
  }
}

/**
 * Get the list of movie from the data
 * @param {*} results the data
 * @returns movie list
 */
function getMovieList(results) {
  let movieList = [];
  results.forEach(e => 
    movieList.push({
      titre: e.title,
      desc: e.overview,
      poster: e.poster_path ? posterPath + e.poster_path : "",
      pop: e.popularity
    })
  );
  return movieList;
}

function displayMovieList(movieList) {
  var demo = document.getElementById("demo");
  demo.replaceChildren();
  movieList.forEach(movie => 
    demo.innerHTML += 
    "<div class='movie-item movie-text col-4'>" +
      "<div class='movie-img'> <img src=" + movie.poster + "> </div>"  +
      "<div class='movie-elem'>" + 
        "<h3>" + movie.titre + "</h3>" +
        "<p>" + movie.desc + "</p>" +
        "<p> Popularité :" + movie.pop + "</p>" +
      "</div>" +
    "</div>"
    );
}