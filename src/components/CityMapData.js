import React from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Weather from "./Weather";
import Movie from "./Movie";


class LatLong extends React.Component {

  constructor() {
    super();
    this.state = {
      searchQuery: '',
      location: '',
      show: 'none',
      mapImage: '',
      weather: '',
      errorMessage: '',
      error: false,
      movies: '',
    }
  }

  handleCitySearch = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`;
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
    const url2 = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}&lat=${this.state.lat}&lon=${this.state.lon}`;
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

  handleMovies = async (e) => {
    e.preventDefault();
    const url3 = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`;
    await axios.get(url3).then(
      response => {
        console.log(response);
        this.setState({
          movies: response,
        })
      })
      .catch((error) => {
        const errorMessage = `${error.response.data.error}. ${error.message} (${error.code}).`;
        this.setState({ showAlert: true, errorMessage: errorMessage })
      })
  }

  //Function to handle user input. Console.log is set to capture each keystroke entered into input field
  handleChange = (e) => {
    let { value } = e.target;
    value.toLowerCase();
    this.setState({ searchQuery: value })
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
          <Button type='submit' className='submit'>Click for a five day forecast</Button>
          <Weather data={this.state.weather}/>
          </Form>
          <Form onSubmit = {this.handleMovies}>
          <Button type='submit' className='submit'>Click for movies that reference this city</Button>
          <Movie data={this.state.movies}/>
          </Form>
        </Container>
      </>
    )
  }
}

export default LatLong;