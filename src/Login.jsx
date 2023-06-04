import React, {useState} from "react";
import { useNavigate, Link} from 'react-router-dom';
import {auth} from './firebase'

export function Login() {
    const navigate = useNavigate("");
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            navigate("/")
        }).catch((e) => {
            alert("Oops owo! adwes emaiw jest źwe sfowmatowany");
        })
    }

    return (
        <body>
            <div id="main">
            <div id="top">Rejestracja</div>
            <div>
            <div id="left"></div>
            <div id="middle">
            <form>
            <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} id="button"></input>
            <input type="password" name="password" placeholder="hasło"onChange={(e) => setPassword(e.target.value)} id="button"></input>
            <button type="submit" onClick={login} id="button">Zaloguj się</button>
            <Link to="/register" id="link">Nie masz konta? Zarejestruj się</Link>
            </form>
            </div>
            <div id="right"></div>
            </div>
            </div>
        </body>
    );
}