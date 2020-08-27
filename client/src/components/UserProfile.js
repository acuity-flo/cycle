import React from 'react';
import { connect } from 'react-redux';

const UserProfile = (props) => {
  const user = props.authUser;
  return (
    <div>
      <h1>PROFILE</h1>
      <h5>Welcome, {user.username}</h5>
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
