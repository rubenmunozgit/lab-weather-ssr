const iconMap = {
  '01': 'day-sunny.svg',
  '02': 'day-cloudy.svg',
  '03': 'cloud.svg',
  '04': 'cloudy.svg',
  '09': 'day-showers.svg',
  '10': 'showers.svg',
  '11': 'storm-showers.svg',
  '13': 'snow.svg',
  '50': 'fog.svg',
};

const getIconSSR = (icon) => iconMap[icon.substr(0, 2)];

export default getIconSSR;
