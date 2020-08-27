import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from '@material-ui/core';

const DayModal = (props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <button type="button" onClick={() => console.log('in modal button')}>
        Add Period
      </button>
      <button type="button" onClick={() => console.log('in modal button')}>
        Add Symptom
      </button>
      <button type="button" onClick={() => console.log('in modal button')}>
        Add Finance
      </button>
    </Modal>
  );
};
