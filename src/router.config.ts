export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/tpl', component: '@/pages/_tpl' },
      { path: '/tpl/demo', component: '@/pages/_tpl/demo' },
      { path: '/tpl/ssr', component: '@/pages/_tpl/ssr' },
    ],
  },
  { component: '@/pages/404' },
];
