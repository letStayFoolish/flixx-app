const global = {
  currentPage: window.location.pathname,
};
// Fetch the data from API
async function fetchAPIData(endpoint) {
  const API_KEY = 'fd8d3dab48909db84857be6066ec11f1';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  return data;
}
// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('/movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
          src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
          class="card-img-top"
          alt='${movie.title}'
        />`
            : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt='${movie.title}'
        />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.getElementById('popular-movies').appendChild(div);
  });
  console.log(results);
}
// Highlight active link:
function highlightActiveLink() {
  const linkList = document.querySelectorAll('.nav-link');
  linkList.forEach((item) => {
    if (item.getAttribute('href') === global.currentPage) {
      item.classList.add('active');
    }
  });
}
// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('TV Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Show Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

window.addEventListener('DOMContentLoaded', init);
