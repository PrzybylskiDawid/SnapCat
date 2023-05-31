import { Routes, Route } from "react-router-dom";
import { Login } from "./Login"
import { Register } from "./Register"
import { Homepage } from "./Homepage"
import { Xd } from "./Xd"


function App() {
  return <Routes>
    <Route path="/" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/homepage" element={<Homepage />}/>
    <Route path="*" element={<Xd />}/>
  </Routes>
}

export default App