const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

title:{
type:String
},

years:{
type:String
},

category:{
type:String,
enum:["Army","Air Force","Navy"]
},

image:{
type:String
},

bio:{
type:String
},

timeline:[
{
year:String,
event:String
}
]

},{timestamps:true});

module.exports = mongoose.model("Hero",heroSchema);