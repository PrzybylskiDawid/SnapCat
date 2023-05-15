import { Routes, Route } from "react-router-dom";
import { Login } from "./Login"
import { Register } from "./Register"

function App() {
  return <Routes>
    <Route path="/" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="*" element={<h1>404 nie znaleziono :D</h1>}/>
  </Routes>
}

export default App