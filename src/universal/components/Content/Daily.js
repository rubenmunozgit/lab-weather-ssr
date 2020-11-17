import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Day from './Day';

const Daily = ({ daily }) => {
  const cardsRendering = daily.map((day) => <Day key={day.dt} {...day} />);
  return (
    <Row>
      <Col className='col d-flex justify-content-between flex-column flex-sm-column flex-md-column flex-lg-row '>
        {cardsRendering}
      </Col>
    </Row>
  );
};

export default Daily;
