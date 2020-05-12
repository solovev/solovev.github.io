import axios from 'axios'
import { toOrder, toMap } from '@/utils'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

const getImageURL = (value, size) =>
  `https://image.tmdb.org/t/p/w${size}${value}`

const createParams = value => {
  return Object.assign(
    {
      api_key: process.env.VUE_APP_API_KEY,
      language: 'en-US'
    },
    value || {}
  )
}

const transformMovie = movie => {
  movie.poster_path = getImageURL(movie.poster_path, 342)
  movie.backdrop_path = getImageURL(movie.backdrop_path, 780)
  movie.id = '' + movie.id
  return movie
}

export default {
  getGenres: () =>
    axios
      .get('/genre/movie/list', {
        params: createParams()
      })
      .then(response => response.data)
      .then(data => toMap(data.genres, 'id')),
  getMovie: ({ id, token }) =>
    axios
      .get('/movie/' + id, {
        cancelToken: token,
        params: createParams()
      })
      .then(response => response.data)
      .then(transformMovie),
  getMovies: ({ page, query, token }) =>
    axios
      .get(query ? '/search/movie' : '/discover/movie', {
        cancelToken: token,
        params: createParams({
          sort_by: 'popularity.desc',
          include_adult: false,
          page,
          query
        })
      })
      .then(response => response.data)
      .then(data => ({
        order: toOrder(data.results, 'id', transformMovie),
        page: data.page,
        totalPages: data.total_pages
      }))
}
