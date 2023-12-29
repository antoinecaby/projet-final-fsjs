import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharactersView from '../views/CharactersView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AdminSuppView from '../views/AdminSuppView.vue'
import AdminUpdateView from '../views/AdminUpdateView.vue'
import CharacterAddView from '../views/CharacterAddView.vue'
import CharacterUpdateView from '../views/CharacterUpdateView.vue'
import CharacterDeleteView from '../views/CharacterDeleteView.vue'

import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/admin/update',
      name: 'update',
      component: AdminUpdateView
    },
    {
      path: '/admin/supp',
      name: 'supp',
      component: AdminSuppView
    },
    {
      path: '/add-character',
      name: 'addCharacter',
      component: CharacterAddView
    },
    {
      path: '/update-character',
      name: 'updateCharacter',
      component: CharacterUpdateView
    },
    {
      path: '/delete-character',
      name: 'deleteCharacter',
      component: CharacterDeleteView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
