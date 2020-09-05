import moment from 'moment';

export function UTIL_FINANCE(financeData, start, end) {
  const financeObj = financeData.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        const dateChange = el.date.slice(0, 10);
        let vals = el.purchases.reduce(
          (innerAcc, innerEl) => {
            if (innerEl.typeOfPurchase === 'prescription')
              innerAcc.prescription += innerEl.cost;
            if (innerEl.typeOfPurchase === 'sanitary products')
              innerAcc.sanitaryProduct += innerEl.cost;
            if (innerEl.typeOfPurchase === 'doctor')
              innerAcc.doctor += innerEl.cost;
            return innerAcc;
          },
          { prescription: 0, sanitaryProduct: 0, doctor: 0 }
        );
        acc.prescription.push(vals.prescription);
        acc.sanitaryProduct.push(vals.sanitaryProduct);
        acc.doctor.push(vals.doctor);
        acc.x.push(moment(dateChange).format('MM-DD-YYYY'));
      }
      return acc;
    },
    { prescription: [], sanitaryProduct: [], doctor: [], x: [] }
  );
  return financeObj;
}

export function UTIL_FINANCE_TOTALS(financeObj) {
  const { doctor, prescription, sanitaryProduct } = financeObj;
  let doctorTotal = 0;
  let prescriptionTotal = 0;
  let sanitaryProductTotal = 0;
  if (doctor[0]) {
    const total = doctor.reduce((acc, el) => {
      return (acc += el);
    });
    doctorTotal = UTIL_COST(Number(total));
  }
  if (prescription[0]) {
    const total = prescription.reduce((acc, el) => {
      return (acc += el);
    });
    prescriptionTotal = UTIL_COST(Number(total));
  }
  if (sanitaryProduct[0]) {
    const total = sanitaryProduct.reduce((acc, el) => {
      return (acc += el);
    });
    sanitaryProductTotal = UTIL_COST(Number(total));
  }
  const financialTotalsObj = {
    doctor: doctorTotal,
    prescription: prescriptionTotal,
    sanitaryProduct: sanitaryProductTotal,
    total:
      Number(doctorTotal) +
      Number(prescriptionTotal) +
      Number(sanitaryProductTotal),
  };
  return financialTotalsObj;
}

export function UTIL_FINANCE_TODAY_DATA(user, date) {
  const todayData = user.financial.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      return el;
    }
  });
  return todayData;
}

export function UTIL_PERIOD_TODAY_DATA(user, date) {
  const todayData = user.period.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      return el;
    }
  });
  return todayData;
}

export function UTIL_SYMPTOM_TODAY_DATA(user, date) {
  const todayData = user.symptomTags.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      return el;
    }
  });
  return todayData;
}

export function UTIL_SYMPTOM_REDUCE(symptoms) {
  return symptoms.reduce((acc, el) => {
    if (el.bool) {
      const obj = {
        symptomName: el.name,
        category: el.category,
      };
      acc.push(obj);
    }
    return acc;
  }, []);
}

export function UTIL_PERIOD_FLOW(periodData, start, end) {
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
    element.date = moment(element.date.slice(0, 10)).format('MM-DD-YYYY');
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
}

export function UTIL_PERIOD_STR(flow) {
  if (flow === 1) {
    return 'spotting';
  } else if (flow === 2) {
    return 'light';
  } else if (flow === 3) {
    return 'medium';
  } else if (flow === 4) {
    return 'heavy';
  }
}

export const UTIL_SYMPTOMS_LIST = {
  mood: ['stressed', 'calm', 'motivated', 'unmotivated'],
  emotion: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
  pain: ['cramps', 'headache', 'back pain'],
  physical: ['nausea', 'bloating', 'indigestion', 'snacky', 'pms'],
};

export function UTIL_SYMPTOMS_LABEL(y) {
  let check = y.toString()[0];
  let index = y.toString().slice(1);
  if (check === '1') {
    return UTIL_SYMPTOMS_LIST['mood'][index];
  }
  if (check === '2') {
    return UTIL_SYMPTOMS_LIST['emotion'][index];
  }
  if (check === '3') {
    return UTIL_SYMPTOMS_LIST['pain'][index];
  }
  if (check === '4') {
    return UTIL_SYMPTOMS_LIST['physical'][index];
  }
}

export function UTIL_SYMPTOM(symptomData, start, end) {
  const symptomObj = symptomData.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        const dateChange = el.date.slice(0, 10);
        el.symptoms.forEach((innerEl) => {
          if (innerEl.category === 'mood') {
            acc.mood.push(innerEl.symptomName);
            acc.mood_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'emotion') {
            acc.emotion.push(innerEl.symptomName);
            acc.emotion_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'pain') {
            acc.pain.push(innerEl.symptomName);
            acc.pain_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'physical') {
            acc.physical.push(innerEl.symptomName);
            acc.physical_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'custom') {
            acc.custom.push(innerEl.symptomName);
            acc.custom_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
        });
      }
      return acc;
    },
    {
      mood: ['mood'],
      mood_x: ['mood_x'],
      emotion: ['emotion'],
      emotion_x: ['emotion_x'],
      pain: ['pain'],
      pain_x: ['pain_x'],
      physical: ['physical'],
      physical_x: ['physical_x'],
      custom: ['custom'],
      custom_x: ['custom_x'],
    }
  );

  let columns = [
    symptomObj['mood_x'],
    symptomObj['emotion_x'],
    symptomObj['pain_x'],
    symptomObj['physical_x'],
    symptomObj['custom_x'],
    symptomObj['mood'].map((el, idx) => {
      if (idx > 0) {
        const value = '1' + UTIL_SYMPTOMS_LIST['mood'].indexOf(el).toString();
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['emotion'].map((el, idx) => {
      if (idx > 0) {
        const value =
          '2' + UTIL_SYMPTOMS_LIST['emotion'].indexOf(el).toString();
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['pain'].map((el, idx) => {
      if (idx > 0) {
        const value = '3' + UTIL_SYMPTOMS_LIST['pain'].indexOf(el).toString();
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['physical'].map((el, idx) => {
      if (idx > 0) {
        const value =
          '4' + UTIL_SYMPTOMS_LIST['physical'].indexOf(el).toString();
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['custom'].map((el, idx) => {
      if (idx > 0) {
        const value = '5' + UTIL_SYMPTOMS_LIST['custom'].indexOf(el).toString();
        return Number(value);
      } else {
        return el;
      }
    }),
  ];

  let labels = [
    symptomObj['mood'],
    symptomObj['emotion'],
    symptomObj['pain'],
    symptomObj['physical'],
    symptomObj['custom'],
  ];

  let data = {
    columns,
    labels,
  };

  return data;
}

export function UTIL_COST(cost) {
  return (cost / 100).toFixed(2);
}
