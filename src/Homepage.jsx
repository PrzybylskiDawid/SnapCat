import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';
import d3fault from './DefaultProfilePic.jpg';
import { db } from "./firebase";
import { wait } from "@testing-library/user-event/dist/utils";
import { specialCharMap } from "@testing-library/user-event/dist/keyboard";

let show = 1;

export function Homepage({ user }) {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  // wyszukiwanie
  useEffect(() => {
    db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })

    if (users !== undefined) {
      const finalUsers = users.filter(user => {
        return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      })

      setFilteredUsers(finalUsers);
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value);
  }

  const navigate = useNavigate("")
  if (user === false) {
    navigate("/Login")
  }
  
  //obrazek profilu
  
  let kot = user?.displayName;

  const ser = users.filter(user => {

    return user.displayName == kot;
  })

  if (ser[0] !== undefined) {
    
    let profile = "https://firebasestorage.googleapis.com/v0/b/snapcat-e6711.appspot.com/o/images%2F"+ser[0].PhotoURL+"?alt=media&token=41984364-eebc-4051-b45e-1d72e49ef219"
    document.getElementById("profilePic").setAttribute("src", profile);
  }


  // pojawianie i znikanie wyszukiwania
  const showSearch = () => {
    document.getElementsByClassName('logo')[0].style.display = 'none';
    document.getElementsByClassName('goback')[0].style.display = 'block';
    document.getElementsByClassName('searchResults')[0].style.display = 'block';
    delay(100).then(() => document.getElementsByClassName('searchResults')[0].style.height = '200px');
    delay(300).then(() => document.getElementById('list').style.display = 'block');
  }

  const hideSearch = () => {
    document.getElementsByClassName('logo')[0].style.display = 'block';
    document.getElementsByClassName('goback')[0].style.display = 'none';
    delay(300).then(() => document.getElementsByClassName('searchResults')[0].style.display = 'none');
    document.getElementsByClassName('searchResults')[0].style.height = '0';
    document.getElementById('list').style.display = 'none';
  }

  // wylogowywanie
  let amongus = localStorage;

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [tiles, setTiles] = useState(ShowTiles());

  useEffect(() => {
    setTiles(ShowTiles());
  });

  function ShowPosts() {
    show = 1;
  }

  function ShowProfiles() {
    show = 2;
  }

  return (
    <body>
      <div id="main">
        <div id="top">
          <img src={logo} alt="logo" className="logo" id="profile_pic" />
          <img src={logo} alt="logo" className="goback" id="profile_pic" style={{display: "none" }} onClick={hideSearch} />
            <div className="search">
            <input type="text" className="searchBox" placeholder="Szukaj nya SnapCacie :3" onClick={showSearch} onChange={updateSearchResults} id="button" />
            <div className="searchResults">
              <ul id="list" style={{ listStyle: 'none' }}>
                {
                  users !== undefined && (
                    filteredUsers.map((user1) => (
                      <li>
                        <a id="suggestion" href="/">
                          {user1.displayName}
                        </a>
                      </li>
                    ))
                  )
                }

              </ul>
            </div>
          </div>
          <div id="navigation">
            <div id="button" onClick={ShowPosts}></div>
            <div id="button" onClick={ShowProfiles}></div>
          </div>
          <div id="user">
            <img src={user?.PhotoURL} alt="profile" id="profile_pic"></img>
          </div>
        </div>
        <div>
          <div id="left">
            <div id="button"><img src={user?.PhotoURL} id="profile_pic"></img><a>{user?.displayName}</a></div>
            <div id="button"><img id="profile_pic"></img><a>Znajomi</a></div>
            <div id="button"><img id="profile_pic"></img><a>Odkrywaj</a></div>
          </div>
          <div id="middle">{tiles}</div>
          <div id="right">
            <FriendButton />
          </div>
        </div>
      </div>
    </body>
  );
}

function TilePost() {
  return (
    <div id="post"><div id="button"><div id="profile_pic"></div><a>Jakiś znajomy</a></div></div>
  )
}

function TileProfile() {
  return (
    <div id="person"><div id="profile_pic"><div id="button"></div></div><div id="add"><div id="button"></div></div><div id="delete"><div id="button"></div></div></div>
  )
}

function ShowTiles() {
  if (show === 1) {
    return (
      <><TilePost /></>
    )
  }
  if (show === 2) {
    return (
      <><TileProfile /></>
    )
  }
}

function FriendButton() {
  return (
    <div id="button"><a>Jakiś znajomy</a><img id="profile_pic"></img></div>
  )
}
