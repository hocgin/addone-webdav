export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {path: '/', component: '@/pages/index'},
      {path: '/dashboard', component: '@/pages/dashboard'},
    ],
  },
  {component: '@/pages/404'},
];
