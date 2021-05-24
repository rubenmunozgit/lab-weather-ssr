import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Refresh from './Refresh';
import sunrise from '../Icons/sunrise.svg';
import sunset from '../Icons/sunset.svg';
import mappin from '../Icons/map-pin.svg';
import wind from '../Icons/wind.svg';
import droplet from '../Icons/droplet.svg';
import { getSunHoursDuration } from '../../../utils/date';
import { Context } from '../Context';

const Current = ({
  city,
  country,
  current,
  metric,
  refreshHandle,
  regionName,
}) => {
  const { translationText } = useContext(Context);
  const { description } = current.weather[0];
  const {
    dt_local,
    feels_like,
    humidity,
    icon,
    sunset_local,
    sunrise_local,
    temp,
    wind_speed,
  } = current;

  const { hrs, mins } = getSunHoursDuration(current.sunset, current.sunrise);
  const windMetrics = metric ? 'm/s' : 'mi/h';

  return (
    <Card className='mb-4'>
      <Card.Header className='bg-success text-black pr-30 pl-10 d-flex justify-content-between'>
        <div className='d-flex justify-content-start'>
          <img
            className='inline'
            src={mappin}
            width={24}
            height={24}
            alt={city}
          />
          <div className='inline ml-2'>
            {city}, {regionName ? `${regionName},` : ''} {country}
          </div>
        </div>
        <div className='d-flex justify-content-start'>
          <Refresh {...{ refreshHandle }} />
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className='d-flex flex-column justify-content-around align-items-center'
          >
            <img
              src={`/static/icons/${icon}`}
              width={100}
              height={100}
              alt={description}
            />
            <h4>
              <small className='text-muted'>{description}</small>
            </h4>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className='d-flex flex-column justify-content-around align-items-center'
          >
            <h3 className='display-3'>{temp}</h3>
            <h4>
              <small className='text-muted'>{`${translationText.feels_like}: ${feels_like}`}</small>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <div className='inline mr-2'>{wind_speed}</div>
              <img
                className='inline'
                src={wind}
                width={24}
                height={24}
                alt='wind speed'
              />
              <div className='inline ml-2'>{windMetrics}</div>
            </div>
            <div className='d-flex align-items-center'>
              <img
                className='inline'
                src={droplet}
                width={24}
                height={24}
                alt='humity'
              />
              <div className='inline ml-2'>{humidity} %</div>
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            className='d-flex justify-content-between align-items-center'
          >
            <div className='inline'>
              <img
                className='inline'
                src={sunrise}
                width={24}
                height={24}
                alt='sunrise'
              />
              <div className='inline'>{sunrise_local}</div>
            </div>
            <div className='inline'>
              {hrs} hr {mins} mins
            </div>
            <div className='inline'>
              <img
                className='inline'
                src={sunset}
                width={24}
                height={24}
                alt='sunset'
              />
              <div className='inline'>{sunset_local}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='bg-light text-dark'>{`${translationText.updated}: ${dt_local}`}</Card.Footer>
    </Card>
  );
};

export default Current;
