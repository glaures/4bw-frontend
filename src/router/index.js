import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from "@/views/SignUpView.vue";
import LinkedInSignUpCallback from "@/components/callbacks/LinkedInSignUpCallback.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignUpView
    },
    {
      path: '/callbacks/linkedin',
      name: 'linkedInCallback',
      props: true,
      component: LinkedInSignUpCallback
    },
    {
      path: '/profiles/:nameId',
      name: 'profile',
      props: true,
      component: ProfileView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
