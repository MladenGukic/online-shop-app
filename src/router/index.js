import Vue from 'vue'
import VueRouter from 'vue-router'
import AppShops from '../views/AppShops.vue'
import AppLogin from '../views/AppLogin.vue'
import AppRegister from '../views/AppRegister.vue'
import UsersShop from '../views/UsersShop.vue'
import AddShop from '../views/AddShop.vue'
import AppManagers from '../views/AppManagers.vue'
import AddArticle from '../views/AddArticle.vue'
import SingleManager from '../views/SingleManager.vue'
import AddManager from '../views/AddManager.vue'
import SingleShop from '../views/SingleShop.vue'
import store from './../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shops',
    component: AppShops,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: AppRegister,
    meta: {
      guest: true
    }
  },
  { 
    path: '/my-shop',
    name: 'my-shop',
    component: UsersShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/shop/create',
    name: 'add-shop',
    component: AddShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/shop/:id',
    name: 'shop',
    component: SingleShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/managers',
    name: 'managers',
    component: AppManagers,
    meta: {
      guest: false
    }
  },
  {
    path: '/managers/:id',
    name: 'manager',
    component: SingleManager,
    meta: {
      guest: false
    }
  },
  {
    path: '/managers/create',
    name: 'addManager',
    component: AddManager,
    meta: {
      guest: false
    }
  },
  {
    path: '/article/create',
    name: 'add-article',
    component: AddArticle,
    meta: {
      guest: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isUserAuthenticated
  if (!to.meta.guest && !isUserLoggedIn) {
    next({
      name: 'login',
      path: '/login'
    })
  }
  return next()
})

export default router
