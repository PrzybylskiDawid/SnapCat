import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';
import d3fault from './DefaultProfilePic.jpg';
import { db } from "./firebase";
import Avatar from 'react-avatar';

let show = 1;

export function Homepage({ user }) {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);

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
          <div className="search">
              <img src={logo} alt="logo" className="logo" style={{width: 60 + "px"}} />
            <input type="text" className="searchBox" placeholder="Szukaj nya SnapCacie :3" onChange={updateSearchResults} />
            <div className="searchResults">
            <ul id="list" style={{ listStyle: 'none' }}>
              {
                users !== undefined && (
                  filteredUsers.map((user1) => (
                    <li>
                      <a href="/">
                        <Avatar src={d3fault}></Avatar>
                        <h3>{user1.displayName}</h3>
                      </a>
                    </li>
                  ))
                )
              }

            </ul>
            </div>
          </div>
          <div id="navigation">
            <div id="button"></div>
            <div id="button"></div>
          </div>
        </div>
        <div>
          <div id="left">
            <div id="button"></div>
            <div id="button"></div>
            <div id="button"></div>
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
    <div id="post"><div id="button"><div id="profile_pic"></div><a>user</a></div></div>
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
    <div id="button"></div>
  )
}