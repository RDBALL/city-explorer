import React from 'react';
import Card from 'react-bootstrap/Card'

class WeatherDay extends React.Component {

  render() {

    return (
      <>
        {this.props.data && (this.props.data.data.map(weatherObject =>
          <Card key={weatherObject.datetime} className='weatherCard'>
            <Card.Body>
              <Card.Title>{weatherObject.date}</Card.Title>
              <Card.Text>
                {weatherObject.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }
}

export default WeatherDay;