import axios from 'axios'

const GOT_ALL_CLOTHES = 'GOT_ALL_CLOTHES'

const gotAllClothes = clothes => {
  return {
    type: GOT_ALL_CLOTHES,
    clothes
  }
}

export const fetchAllClothes = () => {
  return async dispatch => {
    const clothes = await axios.get('/api/clothes')
    dispatch(gotAllClothes(clothes))
  }
}

const allClothes = []

export const clothes = (state = allClothes, action) => {
  switch (action.type) {
    case GOT_ALL_CLOTHES:
      return action.clothes
    default:
      return state
  }
}
