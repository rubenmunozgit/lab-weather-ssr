import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

const App = (props) => {
  const { ip, geoInfo, weather } = props.initialState;
  const { city, country, coords } = geoInfo;
  const { current, daily } = weather;
  const { icon, description } = current.weather[0];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={10} lg={10}>
          <Card>
            <Card.Header className="bg-success text-white pr-30 pl-10">
              <span>{city}, {country}</span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6} className="d-flex flex-column justify-content-around align-items-center" >
                  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                  <h4><small className="text-muted">{description}</small></h4>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="d-flex flex-column justify-content-around align-items-center">
                  <h3 className="display-3">
                    {current.temp}
                  </h3>
                  <h4><small className="text-muted">Feels like: {current.feels_like}</small></h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6} className="d-flex justify-content-between">
                  <p>wind</p>
                  <p>humity</p>
                </Col>
                <Col xs={12} sm={6} className="d-flex justify-content-between">
                  <p>sunrise</p>
                  <p>sunset</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
