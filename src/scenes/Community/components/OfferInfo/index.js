import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import ButtonDelete from '../ButtonDelete'

const OfferInfo = props => (
  <div>
    <Typography type="display2">{props.name}</Typography>
    <ButtonDelete
      handleClick={props.onDelete}
      authenticated={props.authenticated.authenticated}
    />
  </div>
)

OfferInfo.propTypes = {
  authenticated: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default OfferInfo