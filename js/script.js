const global = {
  currentPage: window.location.pathname,
  search: {
    type: '',
    term: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'fd8d3dab48909db84857be6066ec11f1',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};
// Dark/Light Mode Toggle
const checkbox = document.getElementById('checkbox');
function setDarkOrLightModeAuto() {
  const data = new Date();
  const time = data.getHours();

  if (time >= 17 || time < 6) {
    document.body.classList.add('dark');
    checkbox.checked = true;
  } else {
    document.body.classList.remove('dark');
    checkbox.checked = false;
  }
}
setDarkOrLightModeAuto();

// Check current mode and store it on local storage
function toggleTheme() {
  let setTheme = document.body;
  setTheme.classList.toggle('dark');
  let theme;

  if (setTheme.classList.contains('dark')) {
    theme = 'dark-mode';
  } else {
    theme = 'light-mode';
  }

  localStorage.setItem('PageTheme', JSON.stringify(theme));
  localStorage.removeItem('PageTheme-Auto');
}
let getTheme = JSON.parse(localStorage.getItem('PageTheme'));
if (getTheme === 'dark-mode') {
  document.body.classList.add('dark');
  checkbox.checked = true;
} else if (getTheme === 'light-mode') {
  document.body.classList.remove('dark');
  checkbox.checked = false;
}
checkbox.addEventListener('change', toggleTheme);
// Fetch the data from API
async function fetchAPIData(endpoint) {
  // Register your key at: https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. You should store your key and make requests from a server

  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}
// Make Request To Search
async function searchApiData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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
}

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);
  // Overlay for background image
  displayBackdrop('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
      <div>
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
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
          movie.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString(
          'en-US'
        )}</li>
        <li><span class="text-secondary">Revenue:</span>  $${movie.revenue.toLocaleString(
          'en-US'
        )}</li>
        <li><span class="text-secondary">Runtime:</span> ${
          movie.runtime
        } minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
        ${movie.production_companies
          .map((company) => `<div lass="list-group">${company.name}</div>`)
          .join('')}
    </div>
  `;
  document.getElementById('movie-details').appendChild(div);
}
// Display TV Show Details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);
  // Overlay for background image
  displayBackdrop('show', show.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
      <div>
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
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
        <p>${show.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
          show.homepage
        }" target="_blank" class="btn">Visit show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>show Info</h2>
      <ul>
        <li><span class="text-secondary">Number of Episodes:</span> ${
          show.number_of_episodes
        }</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
        ${show.production_companies
          .map((company) => `<div lass="list-group">${company.name}</div>`)
          .join('')}
    </div>
  `;
  document.getElementById('show-details').appendChild(div);
}
// Function to show Backdrop on Details Page
function displayBackdrop(type, backdropUrl) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(
    https://image.tmdb.org/t/p/original/${backdropUrl}
  )`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.25';

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv);
  } else {
    document.getElementById('show-details').appendChild(overlayDiv);
  }
}
//
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    // @todo - make request and display results
    const { results, total_pages, page, total_results } = await searchApiData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }
    displaySearchResults(results);
    document.getElementById('search-term').value = '';
  } else {
    showAlert('Please enter a search term.');
  }
}

function displaySearchResults(results) {
  document.getElementById('search-results-heading').innerHTML = '';
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? `<img
          src='https://image.tmdb.org/t/p/w500/${result.poster_path}'
          class="card-img-top"
          alt='${global.search.type === 'movie' ? result.title : result.name}'
        />`
            : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt='${global.search.type === 'movie' ? result.title : result.name}'
        />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${
          global.search.type === 'movie' ? result.title : result.name
        }</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${
            global.search.type === 'movie'
              ? result.release_date
              : result.first_air_date
          }</small>
        </p>
      </div>
    `;
    document.getElementById('search-results-heading').innerHTML = `
          <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
      `;
    document.querySelector('#search-results').appendChild(div);
  });
  displayPagination();
}
// Create and display pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.getElementById('pagination').appendChild(div);
  // Disable prev button if on first page
  global.search.page === 1 && (document.getElementById('prev').disabled = true);
  // Disable next button if on last page
  global.search.page === global.search.totalPages &&
    (document.getElementById('next').disabled = true);
  // Next Page
  document.getElementById('next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });
  // Previous Page
  document.getElementById('prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });
}
// Show Alert
function showAlert(message, className = 'alert-error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById('alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 2000);
}
// Display Now Playing Movies
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}
// Display Now Playing TV Shows
async function displaySliderTV() {
  const { results } = await fetchAPIData(`tv/on_the_air`);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href='tv-details.html?id=${show.id}'>
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${show.vote_average} / 10
      </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
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
  // Clear the local storage every time page gets reload
  localStorage.removeItem('PageTheme');

  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider('movie');
      displayPopularMovies();
      break;
    case '/shows.html':
      displaySliderTV();
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }
  highlightActiveLink();
  // setDarkOrLightModeAuto();
}

window.addEventListener('DOMContentLoaded', init);
