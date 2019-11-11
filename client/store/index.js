import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './user'
import {clothes} from '../reducers/all-clothes'
import user from '../reducers/user'
import item from '../reducers/item'
import cart from '../reducers/cart'

const reducer = combineReducers({user, item, clothes, cart})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from '../reducers/user'
