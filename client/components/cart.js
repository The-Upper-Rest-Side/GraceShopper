import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'
import {checkout, getCart, removeItem} from '../../client/reducers/cart'
import Item from './cartItem'

class CartView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.user !== 'guest') {
      this.props.getCart()
    }
  }
  render() {
    let {cart, guestCart, remove, user} = this.props
    console.log(this.props)
    if (user !== 'guest') {
      if (cart.length) {
        return (
          <div>
            {cart.map(item => (
              <Item item={item} key={item.id} remove={remove} user={user} />
            ))}
          </div>
        )
      } else {
        return <div>Cart is empty</div>
      }
    } else {
      const theGuestCart = guestCart()
      if (theGuestCart.length) {
        return (
          <div>
            {theGuestCart.map(item => (
              <Item item={item} key={item.id} remove={remove} user={user} />
            ))}
          </div>
        )
      } else {
        return <div>Cart is empty</div>
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    checkout: () => dispatch(checkout()),
    getCart: () => dispatch(getCart()),
    guestCart() {
      let cart = JSON.parse(localStorage.getItem('cart'))
      console.log(cart)
      return cart
    },
    remove: item => dispatch(removeItem(item))
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartView)
