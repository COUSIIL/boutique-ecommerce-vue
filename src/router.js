import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomePage.vue'
import Produits from './views/ProduitsPage.vue'
import Category from './views/CategoryPage.vue'
import Catalogue from './views/CataloguePage.vue'
import Thenks from './views/ThenksPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/produits',
    name: 'catalogue',
    component: Catalogue,
    props: true
  },
  {
    path: '/produits/:id',
    name: 'produits',
    component: Produits,
    props: true
  },
  {
    path: '/category/:id',
    name: 'category',
    component: Category,
    props: true
  },
  {
    path: '/thenks/:id',
    name: 'thenks',
    component: Thenks,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
