import React, {useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { closeWindow } from "./Homepage.jsx";

// Create a reference with an initial file path and name
const storage = getStorage();


export function CreatePost() {

    const[imageUpload, setImageUpload] = useState();

    const uploadFile = () => {
        if(!imageUpload) return;
        

        const imageRef = ref(storage, `images/${imageUpload.name}`)

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
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