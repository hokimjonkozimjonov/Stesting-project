import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/components/pages/index.vue';
import Instructions from '@/components/pages/instructions.vue';
import Publications from '@/components/pages/publications.vue';
import VideoLessons from '@/components/pages/videoLessons.vue';
import Research from '@/components/pages/research.vue';
import About from '@/components/pages/about.vue';
import Details from '@/components/pages/details.vue';
import Login from '@/components/pages/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions,
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications,
    },
    {
      path: '/videoLessons',
      name: 'videoLessons',
      component: VideoLessons,
    },
    {
      path: '/research',
      name: 'research',
      component: Research,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Details,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

export default router;
