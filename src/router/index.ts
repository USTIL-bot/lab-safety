import { useLearnStore } from '@/stores/learn'
import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/learn',
      component: () => import('../views/ContentsView.vue')
    },
    {
      path: '/learn/:id/:page',
      component: () => import('../views/LearnView.vue')
    },
    {
      path: '/award',
      component: () => import('../views/AwardView.vue'),
      beforeEnter: () => {
        const { allHasLearnt } = useLearnStore()
        if (!allHasLearnt()) {
          return '/learn'
        }
      }
    }
  ]
})

router.beforeEach((to) => {
  const { userIsEmpty } = useUserStore()
  if (to.name !== 'home' && userIsEmpty()) {
    return '/'
  }
  if (to.name === 'home' && !userIsEmpty()) {
    return '/learn'
  }
})

export default router
