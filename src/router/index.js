/* Name: Chen Lu
Id: 91906
course number: 2228-CSE-6331-980
lab: Assignment3 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Part2 from '../views/Part2'
import Part3 from '../views/Part3.vue'
import Part4 from '../views/Part4.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/part2',
    name: 'Part2',
    component: Part2
  },
  {
    path: '/part3',
    name: 'Part3',
    component: Part3
  },
  {
    path: '/part4',
    name: 'Part4',
    component: Part4
  }
]

const router = new VueRouter({
  routes
})

export default router
