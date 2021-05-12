import loadable from '@loadable/component';
export default loadable(
  () =>
    import(
      /* webpackChunkName: "async-select" */
      /* webpackPrefetch: true */
      './Select'
    ),
  { ssr: false }
);
