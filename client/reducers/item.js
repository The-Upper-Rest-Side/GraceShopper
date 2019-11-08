import axios from 'axios'
//import history from '../history'

const GET_ITEMS = 'GET_ITEMS'
const clothes = {}

const gotItems = items => {
  return {
    type: GET_ITEMS,
    items
  }
}

export function getItem(itemId) {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(`/api/clothes/${itemId}`)
      console.log(data)
      dispatch(gotItems(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export default function(state = clothes, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
