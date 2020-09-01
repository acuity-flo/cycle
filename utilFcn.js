// const symptomArr = [
//   {
//     date: '06-06-20',
//     symptoms: [
//       { symptomName: 'sad', category: 'mood' },
//       { symptomName: 'tired', category: 'custom' },
//     ],
//   },
//   {
//     date: '06-07-20',
//     symptoms: [
//       { symptomName: 'angry', category: 'mood' },
//       { symptomName: 'pissed', category: 'emotion' },
//       { symptomName: 'whatever', category: 'pain' },
//       { symptomName: 'cramps', category: 'physical' },
//     ],
//   },
// ];

const UTIL_SYMPTOM = (symptomArr, start, end) => {
  const symptomObj = symptomArr.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        el.symptoms.filter((innerEl) => {
          if (innerEl.category === 'mood') {
            acc.mood.push(innerEl.symptomName);
            acc.mood_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'emotion') {
            acc.emotion.push(innerEl.symptomName);
            acc.emotion_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'pain') {
            acc.pain.push(innerEl.symptomName);
            acc.pain_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'physical') {
            acc.physical.push(innerEl.symptomName);
            acc.physical_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'custom') {
            acc.custom.push(innerEl.symptomName);
            acc.custom_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
        });
      }
      return acc;
    },
    {
      mood: [],
      mood_x: [],
      emotion: [],
      emotion_x: [],
      pain: [],
      pain_x: [],
      physical: [],
      physical_x: [],
      custom: [],
      custom_x: [],
    }
  );
  return symptomObj;
};

// console.log(UTIL_SYMPTOM(symptomArr));
