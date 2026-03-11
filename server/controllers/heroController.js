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