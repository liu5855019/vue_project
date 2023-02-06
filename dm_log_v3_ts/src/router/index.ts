import { createRouter, createWebHistory, RouteRecordRaw , } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/dota',
    meta: {
      hidden: true,
      icon: 'ddd'
    }
  },
  {
    path:'/*',
    name: 'not_found',
    meta: {
      hidden: true,
      icon: 'ddd'
    },
    component: () => import('../components/NotFound.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      hidden: true,
      icon: 'ddd'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dota',
    name: 'dota',
    redirect: '/dota/mengjing',
    //iconClass:'aaa',
    component: () => import('../components/home/Home.vue'),
    children: [
      {
        path: '/dota/mengjing',
        name: '梦境记录',
        component: ()=> import('../components/dota/MengJing.vue')
      },
      {
        path: '/dota/createmengjing',
        name: '创建梦境',
        component: ()=> import('../components/dota/CreateMengJing.vue')
      }
    ]
  },
  {
    path: '/log',
    name: 'Logs',
    component: () => import('../components/home/Home.vue'),
    children: [
      {
        path: '/log/logs',
        name: 'Log List',
        component: ()=> import('../components/log/Logs.vue')
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
