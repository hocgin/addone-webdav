export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {path: '/dashboard', component: '@/pages/dashboard'},
      {path: '/fileview', component: '@/pages/fileview'},
    ],
  },
];
