import Vue from 'vue'
import Router from 'vue-router'
import User from './views/Users.vue'
import Seller from './views/Sellers.vue'
import Product from './views/Products.vue'
import Review from './views/Reviews.vue'
import Category from './views/Categories.vue'
import PaymentData from './views/PaymentDatas.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/paymentDatas',
      name: 'paymentDatas',
      component: PaymentDatas
    }
  ]
})
