import React from 'react';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import umbrela from '../../Icons/umbrella.svg';

const Day = ({ dt_local, temp, weather, pop }) => {
  const { icon, description } = weather[0];

  return (
    temp.max &&
    temp.min &&
    description && (
      <Card
        className='flex-row justify-content-between align-items-center flex-lg-column p-2'
        style={{ width: '100%' }}
      >
        <h6>{dt_local}</h6>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          width={80}
          height={80}
        />
        <Card.Body className='d-flex flex-lg-column justify-content-center px-0 py-2'>
          {pop > 0 && (
            <Col className='d-flex align-items-center px-lg-0 py-lg-2'>
              <img className='d-inline' src={umbrela} width={24} height={24} />
              <div className='d-inline ml-2'>{(pop * 100).toFixed(0)} %</div>
            </Col>
          )}
          <Col className='d-flex flex-column align-items-lg-center px-lg-0 py-lg-2'>
            <div className='d-inline ml-2 text-danger'>H: {temp.max}</div>
            <div className='d-inline ml-2 text-primary'>L: {temp.min}</div>
          </Col>
        </Card.Body>
      </Card>
    )
  );
};

export default Day;
