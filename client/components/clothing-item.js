import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'
import {addToCart} from '../../client/reducers/cart'

class ClothingItem extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getItem(this.props.match.params.id)
  }

  render() {
    return (
      <div id="clothesContainer">
        <img className="clothesImage" src={this.props.item.imageUrl} />
        <div id="content">
          <p>Product: {this.props.item.name}</p>
          <p>Price: ${this.props.item.price}</p>
          <p>Size: {this.props.item.size}</p>
          <p>
            <button
              type="button"
              onClick={() => {
                this.props.user !== 'guest'
                  ? this.props.addItem(this.props.item)
                  : this.props.addGuest()
              }}
            >
              Add to Cart
            </button>
          </p>
        </div>
      </div>
    )
  }
}

//needs an "add to cart" button
function mapStateToProps(state) {
  return {
    item: state.item
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getItem: itemId => dispatch(getItem(itemId)),
    addItem: item => dispatch(addToCart(item)),
    addGuest() {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem(
          'cart',
          JSON.stringify([this.props.getItem(this.props.match.params.id)])
        )
      } else {
        let currentCart = JSON.parse(localStorage.getItem('cart'))
        currentCart.push(this.props.getItem(this.props.match.params.id))
        localStorage.setItem('cart', JSON.stringify(currentCart))
      }
    }
  }
}

const SingleClothingItem = connect(mapStateToProps, mapDispatchToProps)(
  ClothingItem
)

export default SingleClothingItem
/*

what does clothing item need?
image to left
price
select size
Add Button
*/
