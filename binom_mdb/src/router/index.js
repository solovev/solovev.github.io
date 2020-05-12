import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRoster from '@/views/MovieRoster.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

export const movieDetailsName = 'Movie details'
export const homeName = 'Movie roster'

const routes = [
  {
    path: '/(movie)?',
    name: homeName,
    component: MovieRoster
  },
  {
    path: '/movie/:id',
    name: movieDetailsName,
    component: MovieDetails
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.name === movieDetailsName) {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  },
  routes
})

export default router
