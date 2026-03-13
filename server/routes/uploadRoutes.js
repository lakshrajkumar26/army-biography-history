const express = require('express')
const router = express.Router()
const upload = require('../config/upload')

// Upload single image
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Return the file path
    const imageUrl = `/uploads/${req.file.filename}`
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
