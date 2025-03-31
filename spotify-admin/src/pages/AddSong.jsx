import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios from 'axios'
import { url } from '../App';
import { toast } from 'react-toastify';

const AddSong = () => {

  const [image,setImage]=useState(false);
  const [song,setSong]=useState(false);
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [album,setAlbum]=useState("none");
  const [loading,setLoading]=useState(false);
  const [albumData,setAlbumData]=useState([]);

  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    setLoading(true);

    try {
      const formData=new FormData();
      formData.append("name",name);
      formData.append("desc",desc);
      formData.append("image",image);
      formData.append('audio',song);
      formData.append("album",album)

      const response=await axios.post(`${url}/api/song/add`,formData);

      if(response.data.success){
        toast.success("song Added");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      }
      else{
        toast.error("something Went wrong")
      }
      
    } catch (error) {
      toast.error("error occurred")
      

    }
    setLoading(false);


    

  }

  const loadAlbumData=async ()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setAlbumData(response.data.albums);

        
      }
      else{
        toast.error("Unable to load album data")
        toast.error("error occur")
      }
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    loadAlbumData();

  },[])
  return loading? (
    <div className="flex items-center justify-center min-h-screen">
  <div className="w-16 h-16 flex items-center justify-center">
    <svg className="animate-spin h-10 w-10 text-green-800" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
    </svg>
  </div>
</div>

  ):
  (
    <form onSubmit={onSubmitHandler} className='flex flex-col  items-start gap-8 text-gray-600' action="">
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload Song</p>
          <input onChange={(e)=>setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
          <label htmlFor="song">
            <img src={song ? assets.upload_added:assets.upload_song} className='w-24 cursor-pointer' alt="" />

          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) :assets.upload_area} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>

      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song desc</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc}  type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e)=>setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'>
          <option value="none">
            None
          </option>
          {albumData.map((item,index)=>(<option key={index} value={item.name}>
            {item.name}
          </option>))}
        </select>
      </div>
      <button type='Submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>

    </form>
  )
}

export default AddSong
