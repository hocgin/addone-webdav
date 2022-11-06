export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {path: '/', component: '@/pages/index'},
      {path: '/welcome', component: '@/pages/welcome'},
      {path: '/dashboard', component: '@/pages/dashboard'},
      {path: '/fileview', component: '@/pages/fileview'},
    ],
  },
  {component: '@/pages/404'},
];
