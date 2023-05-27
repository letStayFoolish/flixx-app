const global = {
  currentPage: window.location.pathname,
};
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
      console.log('Home');
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
