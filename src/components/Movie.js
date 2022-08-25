import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/movies.css'

class Movie extends Component {

  render() {
    
    return (
      
      <Row>
          {this.props.data && (this.props.data.data.map(movieObject =>
            <Col key={movieObject.title + movieObject.imageUrl}>
              <Card className='movieCard'>
              <Card.Img variant="top" width='200px'
                src={movieObject.imgUrl}
                alt={movieObject.title}
                className = "image"/>
                <Card.Body>
                  <Card.Title className='movieTitle'>{movieObject.title}</Card.Title>
                    <Card.Text className='movieOverview'>{movieObject.overview}</Card.Text>
                      <ListGroup as="ol" numbered className='movieStats'>
                        <ListGroup.Item variant="info">Released on: {movieObject.release_date}</ListGroup.Item>
                        <ListGroup.Item variant="info">Viewer Rating: {movieObject.vote_avg}</ListGroup.Item>
                        <ListGroup.Item variant="info">Number of Votes: {movieObject.totalVotes}</ListGroup.Item>
                        <ListGroup.Item variant="info">Popularity Score: {movieObject.popularity}</ListGroup.Item>
                        </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    )
   }
}

export default Movie;