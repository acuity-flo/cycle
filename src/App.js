import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import BubbleChart from "./BubbleChart"
import axios from "axios"
import { Auth } from './Auth'

function App() {
  const [user,setUser] = useState()


  useEffect(()=>{
    const getUser = async () => {
      const res =  await axios.get("/api/")
      console.log('AXIOS CALL',res.data[0].period)
      setUser(res.data[0].period)
    }
    getUser()
  }, [])



  return (
    <BubbleChart user={user} />
    // <Auth />
  )
}

export default App;
