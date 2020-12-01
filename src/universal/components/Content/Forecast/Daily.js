import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Day from './Day';

const Daily = ({ daily }) => {
  const cardsRendering = daily.map((day) => (
    <Day key={day.dt} {...{ ...day }} />
  ));
  return (
    <Card>
      <Card.Header className='bg-success text-white'>Forecast</Card.Header>
      <Row>
        <Col className='col d-flex justify-content-between flex-column flex-sm-column flex-md-column flex-lg-row '>
          {cardsRendering}
        </Col>
      </Row>
    </Card>
  );
};

export default Daily;
