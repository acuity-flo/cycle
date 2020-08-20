import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import BubbleChart from "./BubbleChart"
import axios from "axios"

function App() {
  const [user,setUser] = useState({})


  // const getUser = async () => {
  //   const {data} =  await axios.get('http://localhost:4000/api')
  //   return data
  // }

  useEffect(()=>{
    const getUser = async () => {
      const res =  await axios.get("/api/")
      // setUser(data)
      console.log(res)
    }
    getUser()
  }, [])



  return (
    <BubbleChart user={user} />
  )
}

export default App;
