import React from 'react';
import { connect } from 'react-redux';

const UserProfile = (props) => {
  const user = props.authUser;
  return (
    <div>
      <h1>PROFILE</h1>
      <h5>Welcome, {user.name}</h5>
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
