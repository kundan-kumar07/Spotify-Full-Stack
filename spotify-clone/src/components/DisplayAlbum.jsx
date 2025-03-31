import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/playerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null); // ✅ Start with null
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    const album = albumsData.find((item) => item._id === id);
    if (album) {
      setAlbumData(album);
    }
  }, [id, albumsData]);

  if (!albumData) {
    return <div>Loading...</div>; // ✅ Prevents crashing on initial render
  }

  return (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-3xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify</b>
            <li>1,234,334 likes</li>
            <li>
              <b>50 Songs</b> • about 2 hr 40 min
            </li>
          </p>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 gap-2">
        <p className="mr-4">
          <b>#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />

      {/* Songs List */}
      {songsData
        .filter((item) => albumData && item.album === albumData.name) // ✅ Prevent undefined error
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="w-10 mr-3" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  );
};

export default DisplayAlbum;
