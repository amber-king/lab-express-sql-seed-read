// Dependecies
const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs.js");

const {
  checkFaveBoolean,
  checkSongNameThere,
  checkArtistNameThere,
} = require("../validations/validations.js");

// Part 1 --v

// GET ALL SONGS
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// Part 2 --v

// SHOW one song
songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song) {
    res.status(200).json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE POST song
songs.post("/", async (req, res) => {
  const { name, artist, album, time, is_favorite } = req.body;

  const newSong = await createSong({
    name,
    artist,
    album,
    time,
    is_favorite,
  });
  if (!newSong.error) {
    res.status(200).json(newSong);
  } else {
    res.status(400).json({ error: "server error" });
  }
});

// part 3 --v

// UPDATE PUT song
// ! works on Postman but according to npm test it does not
songs.put(
  "/:id",
  checkFaveBoolean,
  checkArtistNameThere,
  checkSongNameThere,
  async (req, res) => {
    const { id } = req.params;
    const song = req.body;
    const updatedSong = await updateSong(id, song);
    res.status(200).json(updatedSong);
  }
);

// DELETE song
songs.delete(":/id", async (req, res) => {
  const { id } = req.params;
  const goneSong = await deleteSong(id);
  if (goneSong.id) {
    res.status(201).json(goneSong);
  } else {
    res.status(404).json("Song not found");
  }
});

module.exports = songs;
