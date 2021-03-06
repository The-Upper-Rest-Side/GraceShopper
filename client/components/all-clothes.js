import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllClothes} from '../reducers/all-clothes'

class Clothes extends Component {
  componentDidMount() {
    this.props.fetchAllClothes()
  }

  render() {
    let clothes = this.props.clothes.data
    return (
      <div>
        <h1>All Clothes</h1>
        <div id="allClothes">
          {clothes ? (
            clothes.map(item => (
              <div key={item.id} className="itemDisplayed">
                <Link to={`/items/${item.id}`}>
                  <img src={item.imageUrl} />
                  <h3>{item.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  clothes: state.clothes
})

const mapDispatch = dipatch => ({
  fetchAllClothes: () => dipatch(fetchAllClothes())
})

export const AllClothes = connect(mapState, mapDispatch)(Clothes)
