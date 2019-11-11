import axios from 'axios'
//import history from '../history'

const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR CART'
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

const clearCart = () => {
  return {
    type: CLEAR_CART
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
    default:
      return state
  }
}
