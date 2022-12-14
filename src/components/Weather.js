import React from 'react';
import Card from 'react-bootstrap/Card'
import '../styles/weather.css'

class Weather extends React.Component {

  render() {

    return (
      <>
        {this.props.data && (this.props.data.data.map(weatherObject =>
          <Card key={weatherObject.datetime} className='weatherCard'>
            <Card.Body>
              <Card.Title className='weatherTitle'>{weatherObject.date}</Card.Title>
              <Card.Text className='weatherDescription'>
                {weatherObject.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }
}

export default Weather;