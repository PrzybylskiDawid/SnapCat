import { Routes, Route } from "react-router-dom";
import React, {useState} from 'react';
import { Login } from "./Login"
import { Register } from "./Register"
import { Homepage } from "./Homepage"
import { Xd } from "./Xd"
import { auth } from "./firebase"
import { useEffect } from "react";

function App() {

  const [user, setUser] = useState();
  
  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {

      if(authUser) {
        setUser(authUser)
      }
      else{
        setUser(false)
      }
    })
  }, [])

  return <Routes>
    <Route path="/" element={<Homepage user={user} />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="*" element={<Xd />}/>
  </Routes>
}

export default App