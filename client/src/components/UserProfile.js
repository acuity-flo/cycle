import React from 'react';
import { connect } from 'react-redux';

const UserProfile = (props) => {
  const user = props.authUser;
  return (
    <div>
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
    </div>
  );
};

const mapState = (state) => {
  return {
    authUser: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(UserProfile);
