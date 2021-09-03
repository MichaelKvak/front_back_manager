import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home'
import Edit from './pages/Edit'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/edit/:id?', name: 'edit', component: Edit },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
