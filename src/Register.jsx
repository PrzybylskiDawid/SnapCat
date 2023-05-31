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
                    }).then((r) => {
                        navigate("/")
                    })
                })
            }
        })
    }

    return (
        <form>
            <input required onChange={(e) => {setName(e.target.value);}} type="name" name="imie" placeholder="Imie"></input>
            <input required onChange={(e) => {setEmail(e.target.value);}} type="email" name="email" placeholder="Email"></input>
            <input required onChange={(e) => {setPassword(e.target.value);}} type="password" name="password" placeholder="Hasło"></input>
            <button type="submit" onClick={register}>Zarejestruj się</button>
            <Link to="/Login">Masz konto? Zaloguj się</Link>
        </form>
    );
}
