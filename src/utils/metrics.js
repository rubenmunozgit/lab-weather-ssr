const KELVIN = 273.15;
const K2C = (k) => Number((k - KELVIN).toFixed(1));
const C2F = (c) => Number(((c * 9) / 5 + 32).toFixed(1));

const convertion = (oper) => (oper === 'K2C' ? K2C : C2F);

const transform = (daily, conversionOper) => {
  const forEachOne = (obj) => {
    const keys = Object.keys(obj);
    return keys.reduce((o, k) => ({ ...o, [k]: conversionOper(obj[k]) }), {});
  };

  return daily.map((day) => ({
    ...day,
    dew_point: conversionOper(day.dew_point),
    feels_like: forEachOne(day.feels_like),
    temp: forEachOne(day.temp),
  }));
};

const transform2metrics = ({ current, daily }) => {
  return {
    current: {
      ...current,
      feels_like: K2C(current.feels_like),
      temp: K2C(current.temp),
      dew_point: K2C(current.dew_point),
    },
    daily: transform(daily, convertion('K2C')),
  };
};

const transform2imperial = ({ current, daily }) => {
  return {
    current: {
      ...current,
      feels_like: C2F(current.feels_like),
      temp: C2F(current.temp),
      dew_point: C2F(current.dew_point)
    },
    daily: transform(daily, convertion('C2F')),
  };
};

export { transform2metrics, transform2imperial };
