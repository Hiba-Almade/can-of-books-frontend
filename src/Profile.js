
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

import axios from 'axios';


class Profile extends Component {


  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(result => {
        const jwt = result.__raw;
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: "http://localhost:8000",
          url: '/auth'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err))
      })
        .catch(err => console.error(err));
    }
  }
  render() {
    return (
      this.props.auth0.isAuthenticated && (
        <div>
          <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
          <h2>{this.props.auth0.user.name}</h2>
          <p>{this.props.auth0.user.email}</p>
        </div>
      )
    )
  }
}


export default withAuth0(Profile);
