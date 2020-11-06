import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './Main.css';
import sunrise from '../Icons/sunrise.svg';
import sunset from '../Icons/sunset.svg';
import mappin from '../Icons/map-pin.svg';

const Main = ({city, country, current, daily}) => {

    const { icon, description } = current.weather[0];

    return (
    <Container fluid="md" className="Main">
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={10} lg={10}>
          <Card>
            <Card.Header className="bg-success text-white pr-30 pl-10 d-flex justify-content-start">
              <img className="inline" src={mappin}/>
              <div className="inline ml-2">{city}, {country}</div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} className="d-flex flex-column justify-content-around align-items-center" >
                  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                  <h4><small className="text-muted">{description}</small></h4>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} className="d-flex flex-column justify-content-around align-items-center">
                  <h3 className="display-3">
                    {current.temp}
                  </h3>
                  <h4><small className="text-muted">Feels like: {current.feels_like}</small></h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6} className="d-flex justify-content-between">
                  <p>{current.wind_speed}</p>
                  <p>humity</p>
                </Col>
                <Col xs={12} sm={6} className="d-flex justify-content-between">
                  <img className="inline" src={sunrise}/>
                  <img className="inline" src={sunset}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    );
}

export default Main;