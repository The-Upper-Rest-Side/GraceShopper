import React, {Component} from 'react'

const Item = props => {
  const {imageUrl, name, price, quantity} = props.item
  const {remove} = props
  return (
    <div className="row">
      <p>
        <img src={imageUrl} />
      </p>
      <p>Product Name: {name}</p>
      <p>Product Cost: ${price}</p>
      <p>Quantity: {quantity}</p>
      <p>
        <button type="button" onClick={() => remove(props.item)}>
          Remove
        </button>
      </p>
    </div>
  )
}

export default Item
