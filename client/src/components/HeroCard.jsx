import {motion} from "framer-motion"

export default function HeroCard({hero,setSelected}){

return(

<motion.div
layoutId={`hero-${hero._id}`}
onClick={()=>setSelected(hero)}
whileHover={{scale:1.05}}
className="cursor-pointer bg-black border border-red-500 p-4 rounded-lg shadow-xl"
>

<img
src={hero.image}
className="w-full h-48 object-cover grayscale"
/>

<h3 className="text-white text-lg mt-3">{hero.name}</h3>

<p className="text-red-400">{hero.title}</p>

</motion.div>

)

}