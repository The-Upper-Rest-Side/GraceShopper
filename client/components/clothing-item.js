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
    console.log(this.props)
    return (
      <div id="clothesContainer">
        <img className="clothesImage" src={this.props.clothes.imageUrl} />
        <div id="content">
          <p>Product: {this.props.clothes.name}</p>
          <p>Price: ${this.props.clothes.price}</p>
          <p>Size: {this.props.clothes.size}</p>
          <p>
            <input
              min="1"
              type="number"
              id="quantity"
              name="quantity"
              value="10"
            />
            <button type="button">Add to Cart</button>
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
    addItem: item => dispatch(addToCart(item))
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
