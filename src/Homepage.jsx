import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import homeIcon from './home.png';
import usersIcon from './users.png';
import plusIcon from './plus.png';
import { db } from "./firebase";
import { CreatePost } from "./Post.jsx";
import { UserSettings } from "./User.jsx";
import { OtherProfile } from "./Profile";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Create a reference to the file we want to download
const storage = getStorage();
const img = "";

function getPostImage(post) {
  const starsRef = ref(storage, post);
  getDownloadURL(starsRef)
    .then((url, i) => {

      const kocurek = document.getElementById('21');
      if (kocurek == null) {
        console.log("D:");
      }
      else {
        const kocur = document.getElementById('21');
        kocur.setAttribute('src', url);
        kocur.setAttribute('id', "1");
      }


    })
}

let show = 1;
let showWindow = 1;

export function closeWindow() {
  document.getElementById('blackout').style.display = 'none';
}

export function Homepage({ user }) {


  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [divCount, setDivCount] = useState();

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }



  // wyszukiwanie
  useEffect(() => {
    db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })

    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => doc.data()))
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

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [tiles, setTiles] = useState(ShowTiles());
  const [window, setWindow] = useState(openWindow());

  function ShowPosts() {
    show = 1;
    setTiles(ShowTiles());
    setDivCount(posts.length);
  }

  function ShowProfiles() {
    show = 2;
    setTiles(ShowTiles());
  }

  function openWindow() {
    if (showWindow === 1) {
      return (
        <><UserSettings /></>
      )
    }
    if (showWindow === 2) {
      return (
        <><CreatePost /></>
      )
    }
    if (showWindow === 3) {
      return (
        <><OtherProfile /></>
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

  function openOtherProfile() {
    showWindow = 3;
    setWindow(openWindow());
    document.getElementById('blackout').style.display = 'flex';
  }

  function TilePost() {
    return (
      <div id="post">
        <img src="" id="21" alt="image"></img>
        <div id="button" onClick={openOtherProfile}>
          <div id="profile_pic">
          </div>
        </div>
      </div>
    )
  }

  function TileProfile() {
    return (
      <div id="person"><div id="profile_pic"><div id="button" onClick={openOtherProfile}><a>imie</a></div></div><div id="add"><div id="button"><a>dodaj</a></div></div><div id="delete"><div id="button"><a>dodaj</a></div></div></div>
    )
  }

  function penis() {
    if (posts.length != 0) {
      for (let i = 0; i < posts.length; i++) {
        getPostImage(posts[i].ImageURL, i)
      }
    }
  }

  const renderDivs = () => {
    const divs = [];
    const menel = <TilePost />
    
    for (let i = 0; i < divCount; i++) {
      divs.push(menel);
    }
    return divs;
  };

  function ShowTiles() {

    const menel = <TilePost />

    if (show === 1) {

      penis();

    }
    if (show === 2) {
      return (
        <><TileProfile /></>
      )
    }
  }

  function FriendButton() {
    return (
      <div id="button" onClick={openOtherProfile}><a>Jakiś znajomy</a><img id="profile_pic"></img></div>
    )
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
            <div id="button" onClick={ShowPosts}><img src={homeIcon} id="profile_pic"></img></div>
            <div id="button" onClick={ShowProfiles}><img src={usersIcon} id="profile_pic"></img></div>
          </div>
          <div id="user">
            <img src={user?.PhotoURL} id="profile_pic" onClick={openUserSettings}></img>
          </div>
        </div>
        <div>
          <div id="left">
            <div id="button" onClick={openUserSettings}><img id="profile_pic"></img><a>{user?.displayName}</a></div>
            <div id="button" onClick={ShowProfiles}><img src={usersIcon} id="profile_pic"></img><a>Znyajomi</a></div>
            <div id="button" onClick={ShowPosts}><img src={homeIcon} id="profile_pic"></img><a>Odkwywaj</a></div>
            <div id="button" onClick={openPostCreation}><img src={plusIcon} id="profile_pic"></img><a>Dodaj posta</a></div>
          </div>
          <div id="middle"><div>
      {renderDivs()}
    </div></div>
          <div id="right">
            <FriendButton />
          </div>
        </div>
      </div>

    </body>
  );
}