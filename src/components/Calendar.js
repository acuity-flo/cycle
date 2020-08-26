import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'
import { connect } from 'react-redux'

 function CalendarView(props) {
  const [value, onChange] = useState(new Date());
  const user = props.authUser
  const period = user.period
  const finance = user.financial
  

  
  const classesFunc = ({date,view}) => {
      let classesStr = ""
    //   //period - colors days of periods
      if(period && view==="month" && period.some(el => moment(el.date).format("MM DD YYYY") ===moment(date).format("MM DD YYYY"))) {
        classesStr+="period"
      }

    //   finance - colors days of finance
      // if(finance && view==="month" && finance.some(el => moment(el.date).format("MM DD YYYY") ===moment(date).format("MM DD YYYY"))) {
      //   classesStr+="finance"
      // }
      return classesStr
    }



  return (
    <div>
      <h1>CALENDAR</h1>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay = {(value, event) => console.log('Clicked day: ', moment(value))}
        tileClassName = {classesFunc}
      />
    </div>
  );
}


const mapState = state => {
    return {
      authUser: state,
      isLoggedIn: !!state.id
    }
  }

  export default connect(mapState)(CalendarView)