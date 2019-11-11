import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'
import {checkout} from '../../client/reducers/cart'

class CartView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // this.props.getItem(this.props.match.params.id)//
  }
  render() {
    console.log(this.props)
    return <div>yoooo</div>
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
    checkout: () => dispatch(checkout())
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartView)
