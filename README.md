# Flixx App

Movie info application built with vanilla JavaScript that uses **version 3** of the [TMDB API](https://developers.themoviedb.org/3)

This is part of my **Modern JS From The Beginning 2.0** course

<img src="images/Screenshot%202023-05-28%20at%2015.18.png" width="100%">

This includes the most populr movies and TV shows with detail pages, a search box for movies and shows with full pagination and a slider for movies that are currently playing in theaters. The slider uses the [Swiper](https://swiperjs.com) library. Also there is possibility to toggle light and dark mode.

## Usage

Just clone or download and then register for a free API key at https://www.themoviedb.org/settings/api

Once you get your key, just add it to the `api.apiKey` value in the global state at the top.

**Note:** If you are using this as a production project, you should not store this in the client. You can create a proxy server and store your key there. I may add that to the repo later on.

I also may convert this to use a module bundler such as Vite or Webpack.

## Deploy

Page is deployed via [Netlify](https://app.netlify.com/) pages.
Check it on: https://movieappflixx.netlify.app/.