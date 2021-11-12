import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'


Vue.use(VueRouter)

const routes = [
  {path:'/', redirect:'/goods'},
  {path:'/goods', component:goods},
  {path:'/ratings',component:ratings},
  {path:'/seller',component:seller},
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
