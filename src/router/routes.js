const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {  path: '/almacen', component: () => import('pages/almacen.vue') },
      {  path: '/compras', component: () => import('pages/compras.vue') },
      {  path: '/usuarios', component: () => import('pages/usuarios.vue') },
      {  path: '/config', component: () => import('pages/config.vue') },
      {  path: '/logout', component: () => import('pages/logout.vue') },
      {  path: '/movimientos', component: () => import('pages/movimientos.vue') } 
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },

]

export default routes
