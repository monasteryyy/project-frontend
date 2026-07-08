import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TaskCatalogView from '../views/TaskCatalogView.vue';
import TaskCreateView from '../views/TaskCreateView.vue';
import TaskDetailView from '../views/TaskDetailView.vue';
import DashboardView from '../views/DashboardView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import PostulationView from '../views/PostulationView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordView,
  },
  {
    path: '/tasks',
    name: 'TaskCatalog',
    component: TaskCatalogView,
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: TaskCreateView,
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: TaskDetailView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfileView,
  },
  {
    path: '/postulations',
    name: 'Postulations',
    component: PostulationView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;