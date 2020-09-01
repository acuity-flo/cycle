// const symptomData = [
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

const UTIL_SYMPTOM = (symptomData, start, end) => {
  const symptomObj = symptomData.reduce(
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
// assign arbitrary values when charting by mapping over?

const UTIL_FINANCE = (financeData, start, end) => {
  const financeObj = financeData.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        let vals = el.purchases.reduce(
          (innerAcc, innerEl) => {
            if (innerEl.typeOfPurchase === 'prescription')
              innerAcc.prescription += innerEl.cost;
            if (innerEl.typeOfPurchase === 'sanitary product')
              innerAcc.sanitaryProduct += innerEl.cost;
            if (innerEl.typeOfPurchase === 'doctor')
              innerAcc.doctor += innerEl.cost;
            if (innerEl.typeOfPurchase === 'other')
              innerAcc.other += innerEl.cost;
            return innerAcc;
          },
          { prescription: 0, sanitaryProduct: 0, doctor: 0, other: 0 }
        );
        acc.prescription.push(vals.prescription);
        acc.sanitaryProduct.push(vals.sanitaryProduct);
        acc.doctor.push(vals.doctor);
        acc.other.push(vals.other);
        acc.x.push(moment(el.date).format('MM-DD-YYYY'));
      }
      return acc;
    },
    { prescription: [], sanitaryProduct: [], doctor: [], other: [], x: [] }
  );
  return financeObj;
};

const UTIL_PERIOD = (periodData, start, end) => {
  const flow = (element) => {
    if (element.typeOfFlow === 'spotting') {
      element.typeOfFlow = '1';
    } else if (element.typeOfFlow === 'light') {
      element.typeOfFlow = '2';
    } else if (element.typeOfFlow === 'medium') {
      element.typeOfFlow = '3';
    } else if (element.typeOfFlow === 'heavy') {
      element.typeOfFlow = '4';
    }
    element.date = moment(element.date).format('MM-DD-YYYY');
    return element;
  };

  const flowObj = periodData.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        let data = flow(el);
        acc.flow.push(data.typeOfFlow);
        acc.x.push(data.date);
      }
      return acc;
    },
    { flow: [], x: [] }
  );
  return flowObj;
};

module.exports = { UTIL_FINANCE, UTIL_PERIOD, UTIL_SYMPTOM };
