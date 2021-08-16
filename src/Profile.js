import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  componentDidMount =  () => {  
    if(this.props.auth0.isAuthenticated) {
       
      this.props.auth0.getIdTokenClaims()
      .then(result => {
        const jwt = result.__raw;
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: 'https://localhost:8000',
          url: '/auth'
        }
        axios(config)
          .then(axiosResults => console.log(axiosResults.data))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }  

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default withAuth0(Profile);