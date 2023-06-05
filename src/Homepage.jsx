import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';
import d3fault from './DefaultProfilePic.jpg';
import { db } from "./firebase";
import { wait } from "@testing-library/user-event/dist/utils";
import { specialCharMap } from "@testing-library/user-event/dist/keyboard";
import { CreatePost } from "./Post.jsx";
import { UserSettings } from "./User.jsx";

let show = 1;
let showWindow = 1;

export function closeWindow() {
  document.getElementById('blackout').style.display = 'none';
}

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
        console.log(user.PhotoURL)
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
  const [window, setWindow] = useState(openWindow());

  function ShowPosts() {
    show = 1;
    setTiles(ShowTiles());
  }

  function ShowProfiles() {
    show = 2;
    setTiles(ShowTiles());
  }

  function openWindow() {
    if (showWindow === 1){
      return (
        <><UserSettings /></>
      )
    }
    if (showWindow === 2){
      return (
        <><CreatePost /></>
      )
    }
  }

  function openUserSettings() {
    showWindow = 1;
    setWindow(openWindow());
    document.getElementById('blackout').style.display = 'flex';
  }

  function openPostCreation() {
    showWindow = 2;
    setWindow(openWindow());
    document.getElementById('blackout').style.display = 'flex';
  }

  return (
    <body>
      <div id="blackout">
        {window}
      </div>
      <div id="main">
        <div id="top">
          <img src={logo} alt="logo" className="logo" id="profile_pic" />
          <img src={logo} alt="logo" className="goback" id="profile_pic" style={{ display: "none" }} onClick={hideSearch} />
          <div className="search">
            <input type="text" className="searchBox" placeholder="Szukaj nya SnapCacie :3" onClick={showSearch} onChange={updateSearchResults} id="button" />
            <div className="searchResults">
              <ul id="list" style={{ listStyle: 'none' }}>
                {
                  users !== undefined && (
                    filteredUsers.map((user1) => (
                      <li>
                        <img src={user1.PhotoURL} alt="" />
                        <a id="suggestion" href="/">
                          {user1.PhotoURL}
                        </a>
                      </li>
                    ))
                  )
                }

              </ul>
            </div>
          </div>
          <div id="navigation">
            <div id="button" onClick={ShowPosts}><img id="profile_pic"></img></div>
            <div id="button" onClick={ShowProfiles}><img id="profile_pic"></img></div>
          </div>
          <div id="user">
            <img src={user?.PhotoURL} alt="profile" id="profile_pic" onClick={openUserSettings}></img>
          </div>
        </div>
        <div>
          <div id="left">
            <div id="button" onClick={openUserSettings}><img id="profile_pic"></img><a>{user?.displayName}</a></div>
            <div id="button" onClick={ShowProfiles}><img id="profile_pic"></img><a>Znyajomi</a></div>
            <div id="button" onClick={ShowPosts}><img id="profile_pic"></img><a>Odkwywaj</a></div>
            <div id="button" onClick={openPostCreation}><img id="profile_pic"></img><a>Dodaj posta</a></div>
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
