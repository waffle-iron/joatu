import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import TabbedList from './components/TabbedList'
import ResponsivePage from './components/ResponsivePage'

import ProjectInfo from './containers/ProjectInfo'
import OfferInfo from './components/OfferInfo'
import RequestInfo from './components/RequestInfo'
import CreateProject from './scenes/CreateProject'
import CreateOffer from './scenes/CreateOffer'
import CreateRequest from './scenes/CreateRequest'

import ProjectList from './components/ProjectList'
import OfferList from './components/OfferList'
import RequestList from './components/RequestList'

import {
  projectActions,
  offerActions,
  requestActions,
  addParticipant,
  hubActions
} from '../../data/actions'

import {
  getHubCommunity,
  getHubProjects,
  getHubOffers,
  getHubRequests
} from '../../data/hub'

export class Community extends React.Component {
  constructor(props) {
    super(props)

    if (props.match.params.communityId !== props.community.id) {
      props.dispatch(hubActions.changeHub(props.match.params.communityId))
    }
  }

  projectInfoPane = routeInfo => {
    const id = routeInfo.match.params.projectId
    const project = this.props.projects[id]

    // TODO Find a better place for these helper functions
    const resolve = (keyMap, values) => {
      return R.pick(R.keys(keyMap), values)
    }

    if (!project) {
      return null
    }

    return (
      <ProjectInfo
        {...routeInfo}
        {...project}
        // TODO the hourly award needs to be calculated
        hourlyAward={15}
        onJoin={() =>
          this.props.dispatch(addParticipant(this.props.authUser.id, id))
        }
        onDelete={() => this.props.dispatch(projectActions.remove(id))}
        authUser={this.props.authUser}
        participants={resolve(project.participants, this.props.users)}
        returnUrl={this.props.match.url + '/projects'}
      />
    )
  }

  offerInfoPane = routeInfo => {
    const id = routeInfo.match.params.offerId
    const offer = this.props.offers[id]

    if (!offer) {
      return null
    }

    return (
      <OfferInfo
        {...routeInfo}
        authUser={this.props.authUser}
        onDelete={() => this.props.dispatch(offerActions.remove(id))}
        returnUrl={this.props.match.url + '/offers'}
        {...offer}
      />
    )
  }

  requestInfoPane = routeInfo => {
    const id = routeInfo.match.params.requestId
    const request = this.props.requests[id]

    if (!request) {
      return null
    }

    return (
      <RequestInfo
        {...routeInfo}
        authUser={this.props.authUser}
        onDelete={() => this.props.dispatch(requestActions.remove(id))}
        returnUrl={this.props.match.url + '/requests'}
        {...request}
      />
    )
  }

  createProjectPane = routeInfo => {
    return (
      <CreateProject
        {...routeInfo}
        authUser={this.props.authUser}
        onCreate={body => this.props.dispatch(projectActions.create(body))}
        cancelUrl={this.props.match.url + '/projects'}
      />
    )
  }

  createOfferPane = routeInfo => {
    return (
      <CreateOffer
        {...routeInfo}
        authUser={this.props.authUser}
        onCreate={body => this.props.dispatch(offerActions.create(body))}
        cancelUrl={this.props.match.url + '/offers'}
      />
    )
  }

  createRequestPane = routeInfo => {
    return (
      <CreateRequest
        {...routeInfo}
        authUser={this.props.authUser}
        onCreate={body => this.props.dispatch(requestActions.create(body))}
        cancelUrl={this.props.match.url + '/requests'}
      />
    )
  }

  render() {
    return (
      <div>
        <Link to="/">Back to community map</Link>
        {this.props.community && (
          <Typography variant="display3" gutterBottom>
            {this.props.community.name}
          </Typography>
        )}
        <ResponsivePage
          left={
            <TabbedList {...this.props}>
              {this.props.projects && (
                <ProjectList
                  projects={this.props.projects}
                  tabName="Projects"
                  viewUrl={this.props.match.url + '/projects'}
                  createUrl={this.props.match.url + '/create-project'}
                />
              )}
              <OfferList
                offers={this.props.offers}
                tabName="Offers"
                viewUrl={this.props.match.url + '/offers'}
                createUrl={this.props.match.url + '/create-offer'}
              />
              <RequestList
                requests={this.props.requests}
                tabName="Requests"
                viewUrl={this.props.match.url + '/requests'}
                createUrl={this.props.match.url + '/create-request'}
              />
            </TabbedList>
          }
          right={
            <React.Fragment>
              <Route
                path={this.props.match.path + '/projects/:projectId'}
                component={this.projectInfoPane}
              />
              <Route
                path={this.props.match.path + '/offers/:offerId'}
                component={this.offerInfoPane}
              />
              <Route
                path={this.props.match.path + '/requests/:requestId'}
                component={this.requestInfoPane}
              />
              <Route
                path={this.props.match.path + '/create-project'}
                render={this.createProjectPane}
              />
              <Route
                path={this.props.match.path + '/create-request'}
                component={this.createRequestPane}
              />
              <Route
                path={this.props.match.path + '/create-offer'}
                component={this.createOfferPane}
              />
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authUser,
    community: getHubCommunity(state),
    projects: getHubProjects(state),
    offers: getHubOffers(state),
    requests: getHubRequests(state),
    users: state.users
  }
}

// TODO Using withRouter is not the most efficient solution
export default withRouter(connect(mapStateToProps)(Community))
