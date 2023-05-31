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
            if (
                e.message === "The password is invalid or the user does not have a password."
            ) {
                alert("Please check your credentials again");
            } else if (
                e.message === "There is no user record corresponding to this identifier. The user may have been deleted."
            ) {
                alert("Please check your credentials again");
            } else {
                alert(e.message);
            }
        })
    }

    return (
        <form>
            <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" name="password" placeholder="hasło"onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" onClick={login}>Zaloguj się</button>
            <Link to="/register">Nie masz konta? Zarejestruj się</Link>
        </form>
    );
}