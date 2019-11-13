import React, {Component} from 'react'

function refreshPage() {
  window.location.reload(false)
}

const removeGuestCart = id => {
  let cart = JSON.parse(localStorage.getItem('cart'))
  const newCart = cart.filter(currItem => currItem.id !== id)

  localStorage.setItem('cart', JSON.stringify(newCart))
}

const Item = props => {
  const {remove, user, item} = props
  const {imageUrl, name, price, quantity} = item
  return (
    <div className="row">
      <p>
        <img src={imageUrl} />
      </p>
      <p>Product Name: {name}</p>
      <p>Product Cost: ${price}</p>
      <p>Quantity: {quantity}</p>
      <p>
        <button
          type="button"
          onClick={
            user !== 'guest'
              ? () => {
                  remove(item)
                  refreshPage()
                }
              : () => {
                  removeGuestCart(item.id)
                  refreshPage()
                }
          }
        >
          Remove
        </button>
      </p>
    </div>
  )
}

export default Item
