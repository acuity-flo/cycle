import React from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import { Container } from '@material-ui/core';

import UserSwitch from '../forms/UserSwitches';

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
      <p>
        you can view some of your average stats here and make some edits to your
        profile
      </p>
      <UserSwitch user={user} />

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
