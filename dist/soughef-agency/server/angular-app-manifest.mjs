
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1647, hash: 'c2c340cf784cf396eb3491575406fadf4c1c03cbbc2fdb75c37288c91d88c0de', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1219, hash: '9c1da6face3a33e37689732b801c56f3c85dafa9adf1d2f36fa44c35239d71cf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 77348, hash: 'e4ebcefeee0025dd8d7a55113544f3885e71880f279e02e6f46e2750fdf02a65', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-V4RFC4HE.css': {size: 3000, hash: '7VuRXLHMyMk', text: () => import('./assets-chunks/styles-V4RFC4HE_css.mjs').then(m => m.default)}
  },
};
