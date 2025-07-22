const API_KEY = '0c92854ee15be0c1f75bb4718a7e9cd7';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = (category, page = 1) =>
  fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`).then(res => res.json());

export const fetchMovieDetail = (id) =>
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json());

export const fetchMovieCredits = (id) =>
  fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then(res => res.json());

export const fetchSimilarMovies = (id) =>
  fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`).then(res => res.json());

export const searchMovies = (query, page = 1) =>
  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`).then(res => res.json());
