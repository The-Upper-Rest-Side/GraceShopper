import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {getProfile} from '../reducers/userProfile'

class UserProfile extends Component {
  updateUserProfile() {
    event.preventDefault()
    const updatedProfile = {
      email: event.target.email.value,
      firstName: event.target.firstName.value,
      lastName: event.target.email.value
    }
    console.log(updatedProfile)
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
          <input type="submit" value="Submit" id="profileChild" />
        </form>
      </div>
    )
  }
}
const mapState = state => ({
  profile: state.user
})

const connectedUserProfile = connect(mapState, null)(UserProfile)
export default connectedUserProfile
