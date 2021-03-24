import React, { createContext, useContext } from 'react';
import { renderToString } from 'react-dom/server';
import { translations } from '../translations';
import getLang from '../utils/getLangByLocale';

const Context = createContext();

const ErrorPage = (props) => {
  const { translationText } = useContext(Context);
  const error = props.error;
  if (process.env.NODE_ENV !== 'production') {
    return (
      <>
        <h1>Error: {error.message}</h1>
        <code>{error.stack}</code>
      </>
    );
  }

  return (
    <>
      <div className='jumbotron'>
        <div className='container'>
          <h1 className='jumbotron-heading'>{translationText.heading}</h1>
          <p className='lead text-muted'>{translationText.subheading}</p>
        </div>
      </div>
    </>
  );
};

const errorHandler = (err, req, res, next) => {
  const locale = req.acceptsLanguages()[0] || 'en-US';
  const lang = getLang(locale);
  const context = {
    translationText:
      translations[lang].errorText || translations['en'].errorText,
  };

  const body = renderToString(
    <Context.Provider value={context}>
      <ErrorPage error={err} />
    </Context.Provider>
  );

  res.status(500);
  res.render('404', {
    layout: false,
    baseline: 'baseline',
    body,
  });
};

export default errorHandler;
