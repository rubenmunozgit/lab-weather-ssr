import loadable from '@loadable/component';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "async-daily" */
      /* webpackPreload: true */
      './Daily.js'
    ),
  { ssr: false }
);
