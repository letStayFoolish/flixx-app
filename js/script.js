const global = {
  currentPage: window.location.pathname,
};
// Fetch the data from API
async function fetchAPIData(endpoint) {
  // Register your key at: https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. You should store your key and make requests from a server

  const API_KEY = 'fd8d3dab48909db84857be6066ec11f1';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
// Display 20 popular movies
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
// Display 20 popular TV Shows
async function displayPopularTVShows() {
  const { results } = await fetchAPIData('/tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
          src='https://image.tmdb.org/t/p/w500${show.poster_path}'
          class="card-img-top"
          alt='${show.name}'
        />`
            : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt='${show.name}'
        />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.getElementById('popular-shows').appendChild(div);
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
      displayPopularTVShows();
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
