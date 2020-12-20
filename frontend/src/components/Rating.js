import React from 'react'
import propTypes from 'prop-types'

const Rating = (props) => {
  let ratings=[]
  for(let i=1; i < 6; i++) {
      ratings.push(
        <span key={i}>
        <i style={{color:props.color}}className={props.value>=i?'fas fa-star':props.value>=i - 0.5?'fas fa-star-half-alt':'far fa-star'}></i>
      </span>
      )
    
  }
  ratings.push(<span key={6}>{props.text?props.text:''}</span>)
  return (
    <div className="rating">
      {ratings}
    </div>
  )

}

Rating.defaultProps = {
  color:'#f8e825'
}
Rating.propTypes = {
  value:propTypes.number.isRequired,
  text:propTypes.string.isRequired,
  color:propTypes.string
}

export default Rating