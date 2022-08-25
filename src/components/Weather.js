import React from 'react';
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {

  render() {

    return (

      <Row>
        {this.props.data && (this.props.data.data.map(weatherObject =>
          // <Col key={cityWeather.datetime}>
          <ul>
            <li>
              <Card key={weatherObject.datetime}>
                <Card.Body>
                  <Card.Title>{weatherObject.date}</Card.Title>
                  <Card.Text>
                    {weatherObject.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          </ul>
          // </Col>
        ))}
      </Row>
    )
  }
}

export default Weather;