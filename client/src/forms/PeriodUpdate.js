import React, { useState, Fragment } from 'react';
import { authUserThunk } from '../store';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { set } from 'mongoose';
import { withRouter } from 'react-router';

('/me/calendar/:date');

('MMDDYYYY');

const PeriodForm = (props) => {
  const dispatch = useDispatch();

  const date = req.params.id;
  const username = user.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  // {date: '', typeOfFlow: ''}
};
