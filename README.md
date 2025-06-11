# 🎧 Spotify Clone - Fullstack Music Streaming App

A fullstack Spotify-inspired music streaming platform with an integrated **Admin Panel** for uploading and managing songs. It uses **Cloudinary** for media storage and **MongoDB** for metadata, designed to be scalable with room for future enhancements like user authentication, playlists, and analytics.

---

## 🌐 Live Demo

👉 [Live Site](https://spotify-frontend-oq0o.onrender.com/)
👉 [Live Site(Admin)](https://spotify-admin-wbyl.onrender.com/)


---

## ✨ Features

- 🎵 Stream music with custom player
- 🧑‍💻 Admin Panel to manually upload songs with metadata
- ☁️ Image and audio files stored securely in **Cloudinary**
- 📂 MongoDB stores file URLs, song titles, and artist names
- 🖼️ Dynamic song rendering with thumbnails
- 🔧 Scalable backend for adding user authentication and playlists

---

## 🧠 How It Works

1. Admin logs in and uploads a song via a form (title, artist, thumbnail, audio).
2. Files are uploaded to **Cloudinary**, which returns secure URLs.
3. These URLs along with song metadata are saved to **MongoDB**.
4. On the frontend, songs are fetched from the backend and rendered with UI controls.
5. Songs can be played using a custom music player with play, pause, skip, and volume control.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Axios
- React Router
- Tailwind CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary SDK
- Multer (for form-data parsing)
- Dotenv

---

Built with ❤️ by Kundan Kumar Dubey

