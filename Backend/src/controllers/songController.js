import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
const addSong = async (req, res) => {
  try {
    console.log(req.files); // Debugging step

    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio?.[0]; // Ensure correct access
    const imageFile = req.files.image?.[0];

    if (!audioFile || !imageFile) {
      return res.status(400).json({ success: false, message: "Files missing!" });
    }

    const audioupload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioupload.duration / 60)}:${Math.floor(
      audioupload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioupload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();
    res.json({ success: true, message: "Song Added" });

  } catch (error) {
    console.log("Received files:", req.files);

    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const listSong = async (req, res) => {
  try{
    const allSongs=await songModel.find({});
    res.json({success:true,songs:allSongs})

  }catch(error){
    res.json({success:false})

  }

};

const removeSong=async (req,res)=>{
  try{
    await songModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"song removed"})

  }
  catch(error){
    res.json({success:false})

  }

}

export { addSong, listSong ,removeSong};
