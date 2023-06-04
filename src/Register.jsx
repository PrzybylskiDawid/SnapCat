import React, {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth, db} from './firebase'

export function Register() {

    const navigate = useNavigate("");
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            if(auth.user){
                auth.user.updateProfile({
                    displayName: name,
                    PhotoURL: ""
                }).then((s) => {
                    db.collection('users').doc(auth.user.uid).set({
                        uid: auth.user.uid,
                        displayName: auth.user.displayName,
                        email: auth.user.email,
                        PhotoURL: "DefaultPhotoPic.jpg",
                        bio: ""
                    })
                    navigate("/login")
                })
            }
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
            <input required onChange={(e) => {setName(e.target.value);}} type="name" name="imie" placeholder="Imie" id="button"></input>
            <input required onChange={(e) => {setEmail(e.target.value);}} type="email" name="email" placeholder="Email" id="button"></input>
            <input required onChange={(e) => {setPassword(e.target.value);}} type="password" name="password" placeholder="Hasło" id="button"></input>
            <button type="submit" onClick={register} id="button">Zarejestruj się</button>
            <Link to="/Login" id="link">Masz konto? Zaloguj się</Link>
            </form>
            </div>
            <div id="right"></div>
            </div>
            </div>
        </body>
    );
}