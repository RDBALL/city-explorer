import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: true,
    }
  }

  render() {
    return (
      <Row>
        {this.props.data && (this.props.data.data.map(cityWeather =>
          <Col key={cityWeather.datetime}>
            <Card>
              <Card.Body>
                <Card.Title>{cityWeather.datetime}</Card.Title>
                <Card.Text>{cityWeather.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }
}

export default Weather;