const express = require('express')
const router = express.Router()
const Song = require('./song')

// Get all songs
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one song
router.get('/songs/:id', getSong, (req, res) => {
  res.json(res.song)
})

// Create one song
router.post('/songs', async (req, res) => {
  const song = new Song({
    title: req. body.title,
  })

  try {
    const newSong = await song.save()
    res.status(201).json(newSong)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one song using the patch method
router.patch('/songs/:id', getSong, async (req, res) => {
  if (req.body.title != null) {
    res.song.title = req.body.title
  }

  try {
    const updatedSong = await res.song.save()
    res.json(updatedSong)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one song using put method
router.put('/songs/:id', getSong, async (req, res) => {
  if (req.body.title == null) {
    return res.status(400).json({ message: 'Invalid request body' })
  }

  res.song.title = req.body.title
  res.song.description = req.body.description

  try {
    const updatedSong = await res.song.save()
    res.json(updatedSong)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Delete one song
router.delete('/songs/:id', getSong, async (req, res) => {
  try {
    await res.song.remove()
    res.json({ message: 'Song deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSong(req, res, next) {
  try {
    let song = await Song.findById(req.params.id)
    if (song == null) {
      return res.status(404).json({ message: 'Cannot find song' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.song = song
  next()
}

module.exports = router
