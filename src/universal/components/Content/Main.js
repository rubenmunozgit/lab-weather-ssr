import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Current from './Current';
import Daily from './Daily';
import './Main.css';

const Main = ({ city, country, current, daily, refreshHandle }) => {
  return (
    <Container fluid='md' className='Main'>
      <Row className='justify-content-center'>
        <Col>
          <Current {...{ city, country, current, refreshHandle }} />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Daily daily={daily} />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
