const getShortDateFormated = ({ locale = 'en-US', timeZone, date }) => {
  const options = { weekday: 'short', day: 'numeric', timeZone };
  const dt = new Date(date * 1000);
  return new Intl.DateTimeFormat(locale, options).format(dt);
};

const getTimeFormated = ({ locale = 'en-US', timeZone,  date }) => {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone };
  const time = new Date(date * 1000);
  return new Intl.DateTimeFormat(locale, options).format(time);
};

const getSunHoursDuration = (sunrise, sunset) => {
  const msec = new Date((sunrise - sunset) * 1000).getTime();
  const mins = Math.floor(msec / 60000);
  const hrs = Math.floor(mins / 60);
  return { hrs, mins: mins % 60 };
};

export { getShortDateFormated, getTimeFormated, getSunHoursDuration };
