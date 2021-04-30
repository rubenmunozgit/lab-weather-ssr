const makeKey = ({ name, state, country }) =>
  `${name}, ${state ? `${state}, ` : ''}${country}`;

const transformSearchedLocations = (suggestions, lang) => {
  return suggestions.map((sugestion) => ({
    key: makeKey(sugestion),
    name: sugestion.name,
    state: sugestion.state || '',
    country: sugestion.country,
    local_name: sugestion.local_names[lang] || sugestion.name,
    lat: sugestion.lat,
    lon: sugestion.lon,
  }));
};

export default transformSearchedLocations;
