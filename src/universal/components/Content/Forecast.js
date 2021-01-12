import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Day from './Day';
import { Context } from '../Context';

const Forecast = ({ daily }) => {
  const { translationText } = useContext(Context);
  const cardsRendering = daily.map((day) => (
    <Day key={day.dt} {...{ ...day }} />
  ));
  return (
    <Card>
      <Card.Header className='bg-success text-white'>
        {translationText.forecast}
      </Card.Header>
      <Row>
        <Col className='col d-flex justify-content-between flex-column flex-sm-column flex-md-column flex-lg-row '>
          {cardsRendering}
        </Col>
      </Row>
    </Card>
  );
};

export default Forecast;
