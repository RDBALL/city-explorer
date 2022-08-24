import React from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Weather from "./Weather";

class LatLong extends React.Component {

  constructor() {
    super();
    this.state = {
      userSearch: '',
      location: '',
      show: 'none',
      mapImage: '',
      weather: '',
      errorMessage: '',
      error: false,
    }
  }

  handleCitySearch = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.userSearch}&format=json`;
    await axios.get(url).then(
      cityNameInput => {
        console.log(cityNameInput);
        let city = cityNameInput.data[0];
        this.setState({
          show: 'show',
          location: city.display_name,
          lat: city.lat,
          lon: city.lon,
          mapImage: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${city.lat},${city.lon}&zoom=12&size=400x400&format=png`
        })
      })
      //.catch to ID error and return error message
      .catch((error) => {
        const errorMessage = `${error.response.data.error}. ${error.message} (${error.code}).`;
        this.setState({ error: true, errorMessage: errorMessage })
      })
  }

  handleWeather = async (e) => {
    e.preventDefault();
    const url2 = `https://rdball-city-explore-api.herokuapp.com/forecastData?searchQuery=${this.state.userSearch}&format=json`;
    await axios.get(url2).then(
      response => {
        console.log(response[0]);
        this.setState({
          weather: response,
        })
      })
      .catch((error) => {
        const errorMessage = `${error.response.data.error}. ${error.message} (${error.code}).`;
        this.setState({showAlert: true, errorMessage: errorMessage})
      })
  }

  //Function to handle user input. Console.log is set to capture each keystroke entered into input field
  handleChange = (e) => {
    let { value } = e.target;
    value.toLowerCase();
    this.setState({ userSearch: value })
    console.log(value);
  }

  render() {
    return (
      <>
        <Container className='citySearchWrapper'>
          <Form onSubmit={this.handleCitySearch} className='search'>
            <Form.Control type='text' onChange={this.handleChange} placeholder='Input city name' />
            <Button type='submit' className='submit'>Explore!</Button>
          </Form>
          <Card className='cityMapWrapper' style={{ width: '100%' }}>
            <Card.Img variant="top" src={this.state.mapImage} />
            <Card.Body>
              <Card.Title>{this.state.location}</Card.Title>
              <div className='cityLatLonWrapper'>
                <Card.Text>Latitude: {this.state.lat}</Card.Text>
                <Card.Text>Longitude: {this.state.lon}</Card.Text>
              </div>
            </Card.Body>
          </Card>
          <Alert show={this.state.error} variant="danger" onClose={() => this.setState({ error: false })} dismissible>
            <Alert.Heading>
              City not found, please check spelling.
            </Alert.Heading>
            {this.state.errorMessage}
          </Alert>
          <Form onSubmit = {this.handleWeather}>
          <Button type='submit' className='submit'>Click for a three day forecast of {this.state.userSearch}</Button>
          </Form>
          <Weather data={this.state.weather}/>
        </Container>
      </>
    )
  }
}

export default LatLong;