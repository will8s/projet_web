$(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText){
  //make request to api using axios
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+=`
          <div class="img-container">
            <div class="img text-center">
              <img class="movies-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <div class="btn-detail"><a onclick="movieSelected('${movie.id}')" href="#">Movie Details</a></div>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
    .then(function (response) {
    let movie = response.data;
    //console.log(movie);
    let output = `
        <div class="img-container-detail">
          <div class="img-detail">
            <img class="movies-img-detail" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="detail-titre">
            <h2>${movie.title}</h2>
            <div class="detail-detail">
              <div class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</div>
              <div class="list-group-item"><strong>Released:</strong> ${movie.release_date}</div>
              <div class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</div>
              <div class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</div>
              <div class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</div>
            </div>
          </div>
        </div>
        <div class="detail-btn">
          <div class="well">
            <h3>overview</h3>
            <div class="detail-overview">${movie.overview}</div>
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="detail-btn">View IMDB</a>
            <a href="index.html" class="detail-btn">Go Back To Search</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}
