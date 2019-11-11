import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'
import {checkout, getCart} from '../../client/reducers/cart'

class CartView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    console.log('CARTTTT', this.props.cart.data)
    return (
      <div className="cartContainer">
        <img className="smallImage" />
        <p>Product: Sample Name</p>
        <p>Price: $0 </p>
        <p>Size: One Size Fits All</p>
        <button type="button">Delete</button>
      </div>
    )
  }
}

//needs an "add to cart" button
function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}
function mapDispatchToProps(dispatch) {
  return {
    checkout: () => dispatch(checkout()),
    getCart: () => dispatch(getCart())
    // getCart: () =>
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartView)
