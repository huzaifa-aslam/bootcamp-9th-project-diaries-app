import React,{lazy,Suspense,FC,useState} from 'react';
import './App.css';
import {Home} from './features/home/Home'
import {Auth} from './features/auth/ Auth'
// const Auth:any=lazy(()=>{<Home/>})
const App:FC=()=> {
const [isLoggedIn,setIsLogedIn]=useState(true)
  return (
    <div className="App">
      {isLoggedIn?<Auth/>:<Home/>}
    </div>
  );
}

export default App;
