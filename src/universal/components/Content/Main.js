import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Current from './Current/Current';
import Forecast from './Forecast';
import './Main.css';

const Main = ({ city, country, current, daily }) => {
  return (
    <Container fluid='md' className='Main'>
      <Row className='justify-content-center'>
        <Col>
          <Current {...{ city, country }} current={current} />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Forecast daily={daily} />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
