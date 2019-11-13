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
    this.props.getCart()
  }
  calculateBalance() {
    return this.props.cart.reduce((accum, current) => {
      return accum + current.price * current.quantity
    }, 0)
  }
  render() {
    let {cart} = this.props
    const {remove, checkout} = this.props
    let balance = this.calculateBalance()
    if (cart.length) {
      return (
        <div>
          {cart.map((item, key) => (
            <Item item={item} key={item.id} remove={remove} />
          ))}
          <div className="checkout">
            Balance: ${balance}
            <button
              type="button"
              onClick={() => {
                checkout(cart)
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )
    } else {
      return <div>Cart is empty</div>
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}
function mapDispatchToProps(dispatch) {
  return {
    checkout: () => dispatch(checkout()),
    getCart: () => dispatch(getCart()),
    remove: item => dispatch(removeItem(item))
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartView)
