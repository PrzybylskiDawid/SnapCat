import React, {useState, useEffect } from "react";

let show = 1;

export function Homepage() {

  const [tiles, setTiles] = useState(ShowTiles());
  
  useEffect(() => {
    setTiles(ShowTiles());
  });

  function ShowPosts(){
    show = 1;
  }

  function ShowProfiles(){
    show = 2;
  }

  return (
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="main">
      <div id="top">
        <div id="search">
        </div>
        <div id="navigation">
          <div id="button" onClick={ShowPosts}></div>
          <div id="button" onClick={ShowProfiles}></div>
        </div>
        <div id="user">
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
  return(
    <div id="post"><div id="button"><div id="profile_pic"></div><a>user</a></div></div>
  )
}

function TileProfile(){
  return(
    <div id="person"><div id="profile_pic"><div id="button"></div></div><div id="add"><div id="button"></div></div><div id="delete"><div id="button"></div></div></div>
  )
}

function ShowTiles(){
  
  if (show === 1){
    return (
      <><TilePost /></>
    )
  }
  if (show === 2){
    return (
      <><TileProfile /></>
    )
  }
}

function FriendButton(){
  return (
    <div id="button"></div>
  )
}