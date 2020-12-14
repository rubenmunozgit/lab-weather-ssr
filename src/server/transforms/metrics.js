const C2F = (c) => Number(((c * 9) / 5 + 32).toFixed(1));
const F2C = (f) => Number((((f - 32) * 5) / 9).toFixed(1));
const MS2MH = (m) => Number(m * 2.23694).toFixed(1);
const MH2MS = (m) => Number(m / 2.23694).toFixed(1);

const convertion = (oper) => oper;

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

const transformF2C = ({ current, daily }) => ({
  current: {
    ...current,
    feels_like: F2C(current.feels_like),
    temp: F2C(current.temp),
    dew_point: F2C(current.dew_point),
    wind_speed: MH2MS(current.wind_speed),
  },
  daily: transform(daily, convertion(F2C)),
});

const transformC2F = ({ current, daily }) => ({
  current: {
    ...current,
    feels_like: C2F(current.feels_like),
    temp: C2F(current.temp),
    dew_point: C2F(current.dew_point),
    wind_speed: MS2MH(current.wind_speed),
  },
  daily: transform(daily, convertion(C2F)),
});

export { transformC2F, transformF2C };
