import React, { useContext } from "react";
import SideBar from "./components/sidebar";

import Player from "./components/Player";
import Display from "./components/Display";

import "./App.css";
import { PlayerContext } from "./context/playerContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <SideBar></SideBar>
            <Display></Display>
          </div>
          <Player></Player>
        </>
      ) : null}

      
      <audio ref={audioRef} src={track? track.file:null} preload="auto"></audio>
    </div>
  );
};

export default App;
