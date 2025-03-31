import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums); // Fix typo (albums instead of alums)
      }
    } catch (error) {
      toast.error("Error occurred while fetching albums.");
    }
  };

  const removeAlbum=async(id)=>{
    try {
      const response=await axios.post(`${url}/api/album/remove`,{id});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbum();
        
      }
      
    } catch (error) {
      toast.error("Error ocurred");
      
    }

  }



  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold">All Albums List</p>
      <br />
      <div>
        {/* Header Row */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>

        {/* Data Rows */}
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12 h-12 object-cover rounded-md" src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} readOnly />
              <p onClick={()=>removeAlbum(item._id)} className="cursor-pointer">x</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No albums found.</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;
