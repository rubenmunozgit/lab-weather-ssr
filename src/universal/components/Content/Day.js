import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import umbrela from '../Icons/umbrella.svg';

import './Day.css';

const Day = ({ temp, weather, humidity, pop }) => {
  const { icon } = weather[0];
  return (
    temp.day &&
    weather[0].description &&
    humidity && (
      <Card className='flex-row align-items-center flex-lg-column' style={{ width: '100%' }}>
        <Card.Img
          className='daily-icon'
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather[0].description}
        />
        <Card.Body className='d-flex flex-lg-column justify-content-center px-lg-0 py-lg-2'>
          <Col className='d-flex align-items-center px-lg-0 py-lg-2'>
            <img className='d-inline' src={umbrela} />
            <div className='d-inline ml-2'>{(pop*100).toFixed(0)} %</div>
          </Col>
          <Col className='d-flex flex-column align-items-lg-center px-lg-0 py-lg-2'>
            <div className='d-inline ml-2'>H: {temp.max}</div>
            <div className='d-inline ml-2'>L: {temp.min}</div>
          </Col>
        </Card.Body>
      </Card>
    )
  );
};

export default Day;
