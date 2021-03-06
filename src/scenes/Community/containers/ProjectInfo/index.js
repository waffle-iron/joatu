import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'material-ui'

import DisplayMap from './components/DisplayMap'
import ProjectDetails from './components/ProjectDetails'
import ButtonJoin from './components/ButtonJoin'
import ButtonDelete from '../../components/ButtonDelete'
import ParticipantList from './components/ParticipantList'
import UserChip from '../../../../components/UserChip'

const ProjectInfo = props => (
  <div>
    <Typography variant="display2">{props.name}</Typography>
    <Typography variant="subheading">{props.place}</Typography>
    <div>
      {props.coordinates && <DisplayMap {...props} />}
      {/* FIXME Understand why start and duration are initially undefined */}
      {props.start && props.duration && <ProjectDetails {...props} />}
    </div>
    <div>
      <ButtonJoin
        handleClick={props.onJoin}
        authenticated={props.authUser.authenticated}
      />
      <ButtonDelete
        handleClick={props.onDelete}
        authenticated={props.authUser.authenticated}
        returnUrl={props.returnUrl}
      />
    </div>
    <ParticipantList>
      {props.participants &&
        Object.keys(props.participants).map(id => (
          <UserChip key={id} user={props.participants[id]} />
        ))}
    </ParticipantList>
  </div>
)

ProjectInfo.propTypes = {
  authUser: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.string,
  participants: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired
}

export default ProjectInfo
