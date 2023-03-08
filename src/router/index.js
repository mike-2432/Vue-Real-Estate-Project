import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'houses',
    component: () => import('../views/HousesView.vue')
  },
  {
    path: '/house/:id',
    name: 'house',
    component: () => import('../views/SingleHouseView.vue')
  },
  {
    path: '/createListing',
    name: 'create listing',
    component: () => import('../views/CreateListingView.vue')
  },
  {
    path: '/editListing/:id',
    name: 'edit listing',
    component: () => import('../views/CreateListingView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../components/NotFound.vue'),
    props: { message: 'Page not Found' }

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
