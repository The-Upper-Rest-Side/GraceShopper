import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'
import {checkout, getCart, addToCart} from '../../client/reducers/cart'

class CartView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.user !== 'guest' ? this.props.getCart() : this.props.guestCart()
  }
  render() {
    console.log('CARTTTT', this.props)
    return (
      <div className="cartContainer">
        <img className="smallImage" />
        <div>{this.props.guestCart()}</div>
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
    getCart: () => dispatch(getCart()),
    guestCart() {
      let cart = JSON.parse(window.localStorage.getItem('name'))
      return cart.name
    }
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartView)
