import React from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import { Container } from '@material-ui/core';

const UserProfile = (props) => {
  const user = props.authUser;
  return (
    <Container>
      <h1>PROFILE</h1>
      <h5>Welcome, {user.name}</h5>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Pronouns: {user.pronouns}</p>
      <p>Average Cycle Length: {user.avgLengthOfCycle}</p>
      <ProfileUpdate />
    </Container>
  );
};

const mapState = (state) => {
  return {
    authUser: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(UserProfile);
