import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  text: {
    // It's weird that this is necessary, but without it I get serif
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
  }
})

class CreateRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  onInputChange = event => {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState({
      [id]: value
    })
  }

  onSave = e => {
    this.props.onCreate({
      community: this.props.match.params.communityId,
      owner: this.props.authUser.id,
      name: this.state.name
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="display2" gutterBottom>
            Create Request
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.onInputChange}
            required
            fullWidth
            autoFocus
          />
        </Grid>

        <Grid item>
          <Button
            className={classes.button}
            component={Link}
            to={this.props.cancelUrl}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            onClick={this.onSave}
            // TODO Validate before navigating away
            component={Link}
            to={this.props.cancelUrl}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    )
  }
}

CreateRequest.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onCreate: PropTypes.func.isRequired
}

export default withStyles(styles)(CreateRequest)
