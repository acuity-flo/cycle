// symptom update form

// const handleSubmit = (evt) => {
//   evt.preventDefault();

// const updatedSymptoms = symptoms.reduce((acc, el) => {
//   if (el.bool) {
//     const obj = {
//       symptomName: el.name,
//       category: el.category
//     }
//     acc.push(obj)
//   }
//   return acc
// }, [])

//passing in string that is the type (symptoms, finance, period), username, the new array of symptoms (all for the particular date), the date and the index for the symptomTags object in the symptomTags array
// dispatch(updateUserThunk('symptoms', user.username, updatedSymptoms, date, todayDataIdx))
// evt.preventDefault()
// let updatedSymptomTags

// // only if array has some symptoms dispatch with update for today
// // elif data for today was completely removed, delete obj for the day
// if (updatedSymptoms.length) {
//   if (todayDataIdx !== undefined) {
//     updatedSymptomTags = [...user.symptomTags]
//     updatedSymptomTags[todayDataIdx].symptoms = updatedSymptoms
//   } else {
//     updatedSymptomTags = [...user.symptomTags]
//     const symptomsObj = {
//       date: props.date,
//       symptoms: updatedSymptoms
//     }
//     updatedSymptomTags.push (symptomsObj)
//   }
//   dispatch(addSymptomData(user.username, updatedSymptomTags))
// } else if (todayDataIdx !== undefined) {
//   updatedSymptomTags = [...user.symptomTags]
//   // remove obj from array if no symptoms
//   updatedSymptomTags = updatedSymptomTags.splice(todayDataIdx, 1)
//   // dispatch thunk
//   dispatch(addSymptomData(user.username, updatedSymptomTags))
// }
// };

// period update form

//handle submit for the flow update
// const handleSubmit = (evt) => {
//   evt.preventDefault()
//   dispatch(updateUserThunk('period', user.username, flow, date, todayDataIdx))

//   // // only run if when the flow was changed from 0
//   // // run elif when flow is 0, but there was data for the day originally
//   // if (flow > 0) {
//   //   //set updated Period typeOfFlow for dispatch
//   //   let updatedPeriod, typeOfFlow;
//   //   if (flow === 1) {
//   //     typeOfFlow = "spotting";
//   //   } else if (flow === 2) {
//   //     typeOfFlow = "light";
//   //   } else if (flow === 3) {
//   //     typeOfFlow = "medium";
//   //   } else if (flow === 4) {
//   //     typeOfFlow = "heavy";
//   //   }

//   //   // if there was data for today, reset vals and dispatch
//   //   //else construct obj and push obj
//   //   if (todayDataIdx !== undefined) {
//   //     updatedPeriod = [...props.user.period];
//   //     updatedPeriod[todayDataIdx].typeOfFlow = typeOfFlow;
//   //   } else {
//   //     updatedPeriod = [...props.user.period, {
//   //       date: props.date,
//   //       typeOfFlow,
//   //     }];
//   //   }

//   //   //dispatch thunk
//   //   dispatch(addPeriodData(user.username, updatedPeriod));
//   //   // setLoading(false)
//   //   // setSuccess(true)
//   // } else if (todayDataIdx !== undefined) {
//   //   let updatedPeriod = [...props.user.period];

//   //   //remove obj from array when reset to 0
//   //   updatedPeriod = updatedPeriod.splice(todayDataIdx, 1);

//   //   //dispatch thunk
//   //   dispatch(addPeriodData(user.username, updatedPeriod));
//   // }
// };

// finance update form

//submit the finances updates
// const handleSubmit = (evt) => {
//   evt.preventDefault()
//   dispatch(updateUserThunk('financial', user.username, purchases, date, todayDataIdx))
//   // if (purchases.length > 0) {
//   //   const purchasesUpdated = purchases.filter((el) => el.typeOfPurchase !== "")
//   //   let updatedFinancial
//   //   if (todayDataIdx !== undefined) {
//   //     //spread financial data here, but it's a shallow copy.
//   //     updatedFinancial = [...user.financial];
//   //     updatedFinancial[todayDataIdx].purchases = purchasesUpdated;
//   //   } else {
//   //     const financeObj = {
//   //       date: props.date,
//   //       purchases,
//   //     };
//   //     updatedFinancial = [...user.financial, financeObj];
//   //   }
//   //   dispatch(addFinanceData(user.username, updatedFinancial));
//   // } else if (todayDataIdx !== undefined) {
//   //   let updatedFinancial = [...user.financial]
//   //   updatedFinancial.splice(todayDataIdx, 1)
//   //   dispatch(addFinanceData(user.username, updatedFinancial));
//   // }
// };

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
