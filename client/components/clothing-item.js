import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../../client/reducers/item'

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
      <div className="clothesContainer">
        <img className="clothesImage" src={this.props.clothes.imageUrl} />
        <div className="content">
          <p>Product: {this.props.clothes.name}</p>
          <p>Price: ${this.props.clothes.price}</p>
          <p>Size: {this.props.clothes.size}</p>
          <button type="button">Add to Cart</button>
        </div>
        <p />
      </div>
    )
  }
}

//needs an "add to cart" button
function mapStateToProps(state) {
  return {
    clothes: state.item
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getItem: itemId => dispatch(getItem(itemId))
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
