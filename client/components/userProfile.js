import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateMe} from '../reducers/user'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.updateUserProfile = this.updateUserProfile.bind(this)
  }

  updateUserProfile() {
    event.preventDefault()
    const updatedProfile = {
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    }
    console.log(this.props)
    this.props.updateProfile(updatedProfile)
  }

  render() {
    let profile = this.props.profile
    return (
      <div>
        <h1>You can Update Your profile here</h1>

        <form
          method="post"
          id="profileContainer"
          onSubmit={this.updateUserProfile}
        >
          <label id="profileChild"> First name:</label>
          <input type="text" name="firstName" id="profileChild" />
          <label id="profileChild">Last name:</label>
          <input type="text" name="lastName" id="profileChild" />
          <label id="profileChild">email:</label>
          <input
            type="text"
            name="email"
            value={`${profile.email}`}
            id="profileChild"
          />
          <label id="profileChild"> Address:</label>
          <input type="text" name="address" id="profileChild" />
          <input type="submit" value="Submit" id="profileChild" />
        </form>
      </div>
    )
  }
}
const mapState = state => ({
  profile: state.user
})

const mapDispatch = dispatch => {
  return {
    updateProfile: user => dispatch(updateMe(user))
  }
}
const connectedUserProfile = connect(mapState, mapDispatch)(UserProfile)
export default connectedUserProfile
