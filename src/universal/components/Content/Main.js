import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Current from './Current';
import Forecast from './Forecast';
import './Main.css';

const Main = (props) => {
  const { daily, ...rest } = props;
  return (
    <Container fluid='md' className='Main'>
      <Row className='justify-content-center'>
        <Col>
          <Current {...rest} />
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
