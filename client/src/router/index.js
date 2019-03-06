import Vue from 'vue'
import Router from 'vue-router'
import Houses from '@/components/Houses'
import HousesDetail from '@/components/HousesDetail'
import Tenants from '@/components/Tenants'
import TenantsDetail from '@/components/TenantsDetail'
import Invoices from '@/components/Invoices'
import Login from '@/components/Login'
import EventBus from '@/event-bus'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/houses',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/houses',
      name: 'Houses',
      component: Houses,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/houses/:id',
      name: 'HousesDetail',
      component: HousesDetail,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/tenants',
      name: 'Tenants',
      component: Tenants,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/tenant/:ssn',
      name: 'TenantsDetail',
      component: TenantsDetail,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: Invoices,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('jwt') !== null && (to.path === '/login' || to.path === '/register')) {
    this.replace('/')
  }
  if (to.path === '/logout') {
    localStorage.removeItem('jwt')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('id')
    EventBus.$emit('logout')
    next({
      path: '/login'
    })
  }
  if (to.meta.requiredAuth) {
    if (localStorage.getItem('jwt') !== null) {
      next()
    } else {
      next({
        path: '/login',
        query: { nextUrl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router;