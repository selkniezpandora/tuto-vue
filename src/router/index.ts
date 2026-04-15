import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CounterView from '../views/CounterView.vue';
import TodoView from '../views/TodoView.vue';
import RegisterView from '../views/RegisterView.vue';
import GradesView from '../views/GradesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/counter',
      name: 'counter',
      component: CounterView
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/grades',
      name: 'grades',
      component: GradesView
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
