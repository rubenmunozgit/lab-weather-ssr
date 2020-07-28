const errorHandler = (err, req, res, next) => {
  let body = `
      <h1>Sorry we'll be right back</h1>
      <p>Something unexpected happened and we're fixing it.</p>
    `;
  if (process.env.NODE_ENV !== 'production') {
    body = `
        <h1>Error: ${err.message}</h1>
        <code>${err.stack
          .replace(/\n/g, '<br/>')
          .replace(/\s{4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;')}</code>
      `;
  }
  res.status(500);
  res.render('404', { layout: false, body });
};

export default errorHandler;
