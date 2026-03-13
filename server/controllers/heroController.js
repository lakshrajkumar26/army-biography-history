const Hero = require("../models/heroModel");

exports.createHero = async(req,res)=>{

try{

const hero = await Hero.create(req.body)

res.status(201).json(hero)

}catch(err){

res.status(500).json({error:err.message})

}

}

exports.getHeroes = async(req,res)=>{

try{

const heroes = await Hero.find()

res.json(heroes)

}catch(err){

res.status(500).json({error:err.message})

}

}


exports.updateHero = async(req, res) => {
  try {
    const hero = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" })
    }
    
    res.json(hero)
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteHero = async(req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id)
    
    if (!hero) {
      return res.status(404).json({ error: "Hero not found" })
    }
    
    res.json({ message: "Hero deleted successfully" })
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}
