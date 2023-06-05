import React, {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth, db} from './firebase'
import { closeWindow } from "./Homepage.jsx";

export function OtherProfile() {
    return(
        <div id="window">
            <div>
                <img id="profile_pic"></img><div>bio</div>
            </div>
            <a>imie</a>
            <div>
                <div id="button"><a>Dodaj do znajomych</a></div>
                <div onClick={closeWindow} id="button"><a>Zamknij</a></div>
            </div>
            
        </div>
    );
}