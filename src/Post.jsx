import React, {useState} from "react";
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth, db} from './firebase'
import { closeWindow } from "./Homepage.jsx";

export function CreatePost() {
    return(
        <div id="window">
            <div id="top">Nowy post</div>
            <div id="middle">
            <form>
            <input id="button"></input>
            <button type="submit" id="button">Opublikuj</button>
            <div onClick={closeWindow} id="button"><a>Anuluj</a></div>
            </form>
            </div>
        </div>
    );
}