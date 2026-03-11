import {useEffect,useState} from "react"
import axios from "axios"
import {AnimatePresence} from "framer-motion"

import HeroCard from "../components/HeroCard"
import HeroModal from "../components/HeroModal"

export default function Landing(){

const [heroes,setHeroes]=useState([])
const [selected,setSelected]=useState(null)

useEffect(()=>{

axios.get("http://localhost:5000/api/heroes")
.then(res=>setHeroes(res.data))

},[])

return(

<div className="bg-[#0a0f14] min-h-screen p-10">

<div className="grid grid-cols-4 gap-6">

{heroes.map(hero=>(
<HeroCard
key={hero._id}
hero={hero}
setSelected={setSelected}
/>
))}

</div>

<AnimatePresence>

{selected && (
<HeroModal
hero={selected}
onClose={()=>setSelected(null)}
/>
)}

</AnimatePresence>

</div>

)

}