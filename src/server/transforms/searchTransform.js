const makeKey = ({ name, state, country }) =>
  `${name}, ${state ? `${state}, ` : ''}${country}`;

const transformSearchedLocations = (suggestions, lang) => {
  return suggestions.map((sugestion) => ({
    key: makeKey(sugestion),
    city: sugestion.local_names[lang] || sugestion.name,
    country: sugestion.country,
    lat: sugestion.lat,
    lon: sugestion.lon,
    name: sugestion.name,
    regionName: sugestion.state || '',
  }));
};

export default transformSearchedLocations;
