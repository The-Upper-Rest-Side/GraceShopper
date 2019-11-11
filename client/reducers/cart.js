import axios from 'axios'
//import history from '../history'

const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR CART'
const GOT_CART = 'GOT_CART'
const CHECKOUT = 'CHECKOUT'

const cart = []

const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

const deleteItem = itemId => {
  return {
    type: DELETE_ITEM,
    itemId
  }
}

const gotCart = userCart => {
  return {
    type: GOT_CART,
    userCart
  }
}

const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export function addToCart(itemId) {
  return async dispatch => {
    try {
      const item = await axios.put(`api/clothes/${itemId}/cart`)
      dispatch(addItem(item))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export function getCart() {
  return async dispatch => {
    try {
      const userCart = await axios.get(`api/users/cart`)

      dispatch(gotCart(userCart))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}
export function checkout() {
  return dispatch => {
    try {
      cart.forEach(async currentItem => {
        let itemId = currentItem.id
        await axios.delete(`/api/clothes/${itemId}/cart`)
      })
      dispatch(clearCart())
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case DELETE_ITEM:
      return state.filter(item => {
        return item.id !== action.itemId
      })
    case CLEAR_CART:
      return []
    case GOT_CART:
      return [...state, action.userCart]
    default:
      return state
  }
}
