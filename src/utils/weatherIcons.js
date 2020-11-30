import sun from '../universal/components/Icons/day-sunny.svg';
import dayCloud from '../universal/components/Icons/day-cloudy.svg';
import cloud from '../universal/components/Icons/cloud.svg';
import cloudy from '../universal/components/Icons/cloudy.svg';
import dayShower from '../universal/components/Icons/day-showers.svg';
import showers from '../universal/components/Icons/showers.svg';
import storm from '../universal/components/Icons/storm-showers.svg';
import snow from '../universal/components/Icons/snow.svg';
import fog from '../universal/components/Icons/fog.svg';

const iconMap = {
  '01': sun,
  '02': dayCloud,
  '03': cloud,
  '04': cloudy,
  '09': showers,
  '10': dayShower,
  '11': storm,
  '13': snow,
  '50': fog,
};

const getIcon = (icon) => {
  return iconMap[icon.substr(0, 2)];
};

export default getIcon;
