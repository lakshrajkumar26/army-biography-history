const express = require("express")
const router = express.Router()

const {createHero,getHeroes} = require("../controllers/heroController")
const {adminAuth} = require("../middleware/authMiddleware")

router.post("/create",adminAuth,createHero)

router.get("/",getHeroes)

module.exports = router