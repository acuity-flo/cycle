// from original User model schema

// symptom: {
//   mood: [
//     {
//       date: { type: Date, default: Date.now },
//       typeOfMood: [
//         {
//           type: String,
//           enum: ['stressed', 'motivated', 'calm', 'unmotivated'],
//         },
//       ],
//     }, // selectable list of strings to store into an array to be able to choose multiple
//   ], //dropdown?
//   emotion: [
//     {
//       date: { type: Date, default: Date.now },
//       typeOfEmotion: [
//         {
//           type: String,
//           enum: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
//         },
//       ],
//     },
//   ], // selectable list of strings to store into an array to be able to choose multiple
//   pain: [
//     {
//       date: { type: Date, default: Date.now },
//       typeOfPain: [
//         {
//           type: String,
//           enum: ['cramp', 'headache', 'back'],
//         },
//       ],
//     },
//   ], // selectable list of strings to store into an array to be able to choose multiple
//   other: [
//     {
//       date: { type: Date, default: Date.now },
//       typeOther: [
//         {
//           type: String,
//           enum: [
//             'nausea',
//             'bloating',
//             'indigestion',
//             'fatigue',
//             'snacky',
//             'PMS',
//           ],
//         },
//       ],
//     },
//   ],
// },

// demographic: {
//   idenfity: {type: String},
//   race: {type: String, enum: []},
//   income: {type: String, enum: ['0-15','15-30k', '30-45', '45-60', '' ]},
//   city: {},
// },


//calendar modal
// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputLabel,
//   Select,
//   MenuItem,
//   Modal,
// } from '@material-ui/core';

// // props = {date, open, handleClose}

// const DayModal = (props) => {
//   return (
//     <Modal
//       open={props.open}
//       onClose={props.handleClose}
//       aria-labelledby="simple-modal-title"
//       aria-describedby="simple-modal-description"
//     >
//       {/* <button type="button" onClick={() => console.log('in modal button')}>
//         Add Period
//       </button>
//       <button type="button" onClick={() => console.log('in modal button')}>
//         Add Symptom
//       </button>
//       <button type="button" onClick={() => console.log('in modal button')}>
//         Add Finance
//       </button> */}
//     </Modal>
//   );
// };

// export default DayModal;
