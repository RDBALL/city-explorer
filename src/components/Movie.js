import { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';

class Movie extends Component {

  render() {
    
    return (
      
      <Row>
          {this.props.data && (this.props.data.data.map(movieObject =>
            <Col key={movieObject.title + movieObject.imageUrl}>
              <Card>
              <Card.Img variant="top" width='20px'
                src={movieObject.imageUrl}
                alt={movieObject.title}
                className = "image"
                />
                <Card.Body>
                  <Card.Title>{movieObject.title}</Card.Title>
                      <ListGroup as="ol" numbered>
                        <ListGroup.Item variant="info">Released on: {movieObject.released_on}</ListGroup.Item>
                        <ListGroup.Item variant="info">Viewer Rating: {movieObject.average_votes}</ListGroup.Item>
                        <ListGroup.Item variant="info">Number of Votes: {movieObject.total_votes}</ListGroup.Item>
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