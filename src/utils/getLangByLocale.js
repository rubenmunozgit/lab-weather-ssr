const getLang = (locale) => {
  const lang = locale.split('-')[0];
  return lang === 'zh' ? locale.toLowerCase().replace('-', '_') : lang;
};

export default getLang;
