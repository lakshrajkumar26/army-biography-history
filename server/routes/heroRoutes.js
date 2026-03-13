const express = require("express")
const router = express.Router()

const {createHero, getHeroes, updateHero, deleteHero} = require("../controllers/heroController")
const {adminAuth} = require("../middleware/authMiddleware")

router.post("/create", adminAuth, createHero)
router.post("/", createHero) // For admin panel without auth
router.get("/", getHeroes)
router.put("/:id", updateHero) // Update hero
router.delete("/:id", deleteHero) // Delete hero

module.exports = router