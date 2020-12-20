import React, { useEffect, useState } from 'react'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = (props) => {

  const [product, setProduct] = useState({})
  useEffect(() => {
    const fetchProduct = async () => {
        const {data} = await axios.get(`/api/products/${props.match.params.id}`)
        setProduct(data)
    }
    fetchProduct()
  }, [props.match])
// if (!product) {
//   console.log("Loading ......")
// }
    return(
      <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup.Item variant="flush">
            <h2>{product.name}</h2>
          </ListGroup.Item>
          <ListGroup.Item variant="flush">
            <Rating value={product.rating} text={`${product.numReviews} review`}/>
          </ListGroup.Item>
          <ListGroup.Item>
            Price: ₹{product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup.Item>
              <Row>
                <Col>
                Price:
                </Col>
                <Col>
                ₹{product.price}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                Status:
                </Col>
                <Col>
                ₹{product.countInStock > 0? 'In Stock':'Out Of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroup.Item>

          </Card>
        </Col>
      </Row>
      </>
    )
}

export default ProductScreen