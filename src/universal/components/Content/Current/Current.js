import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { getSunHoursDuration } from '../../../../utils/date';
import sunrise from '../../Icons/sunrise.svg';
import sunset from '../../Icons/sunset.svg';
import mappin from '../../Icons/map-pin.svg';
import wind from '../../Icons/wind.svg';
import droplet from '../../Icons/droplet.svg';

const Current = ({ city, country, current }) => {
  const { description } = current.weather[0];
  const {
    feels_like,
    humidity,
    icon,
    sunset_local,
    sunrise_local,
    temp,
    wind_speed,
  } = current;
  const { hrs, mins } = getSunHoursDuration(current.sunset, current.sunrise);
  return (
    <Card className='mb-4'>
      <Card.Header className='bg-success text-white pr-30 pl-10 d-flex justify-content-start'>
        <img className='inline' src={mappin} width={24} height={24} />
        <div className='inline ml-2'>
          {city}, {country}
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
            <img src={`/static/icons/${icon}`} width={100} height={100} />
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
              <small className='text-muted'>Feels like: {feels_like}</small>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <div className='inline mr-2'>{wind_speed}</div>
              <img className='inline' src={wind} width={24} height={24} />
            </div>
            <div className='d-flex align-items-center'>
              <img className='inline' src={droplet} width={24} height={24} />
              <div className='inline ml-2'>{humidity} %</div>
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            className='d-flex justify-content-between align-items-center'
          >
            <div className='inline'>
              <img className='inline' src={sunrise} width={24} height={24} />
              <div className='inline'>{sunrise_local}</div>
            </div>
            <div className='inline'>
              {hrs} hr {mins} mins
            </div>
            <div className='inline'>
              <img className='inline' src={sunset} width={24} height={24} />
              <div className='inline'>{sunset_local}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Current;
