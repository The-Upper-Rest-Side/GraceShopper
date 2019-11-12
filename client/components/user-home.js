import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      {email ? (
        <h3>Welcome, {email}</h3>
      ) : (
        <div>
          <h1>Welcome stranger!!</h1>{' '}
          <h2>
            Please take some time to complete your{' '}
            <Link to="/profile">profile</Link>
          </h2>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
