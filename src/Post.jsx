import React, {useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { closeWindow } from "./Homepage.jsx";
import {auth, db} from './firebase'
import firebase from 'firebase/compat/app'

// Create a reference with an initial file path and name
const storage = getStorage();


export function CreatePost() {

    const user = firebase.auth().currentUser
    const[imageUpload, setImageUpload] = useState();

    const uploadFile = () => {
        if(!imageUpload) return;
        

        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);

            }).then((s) => {
                db.collection('posts').doc(imageUpload.name).set({
                    id: user.email,
                    author: user.displayName,
                    ImageURL: `images/${imageUpload.name}`,
                    
                })
            })
        })
    }


    return(
        <div id="window">
        <div id="top">Nowy post</div>
        <div id="middle">
        <input onChange={(event) => {
        setImageUpload(event.target.files[0]);
    }} type="file" accept="image/*" className="four" id="button"></input>

        <button id="button" onClick={uploadFile}>Opublikuj</button>
        <div onClick={closeWindow} id="button"><a>Anuluj</a></div>
        </div>
    </div>
    );
}