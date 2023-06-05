import React, {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth, db} from './firebase'
import { closeWindow } from "./Homepage.jsx";

export function UserSettings() {
    return(
        <div id="window">
            <div id="top">Profil</div>
            <div id="middle">
            <form>
            <input id="button"></input>
            <button type="submit" id="button">Zmień</button>
            <div onClick={closeWindow} id="button"><a>Anuluj</a></div>
            </form>
            </div>
        </div>
    );
}