import {motion} from "framer-motion"

export default function HeroModal({hero,onClose}){

return(

<motion.div
className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
onClick={onClose}
>

<motion.div
layoutId={`hero-${hero._id}`}
className="bg-black border border-red-500 p-6 w-[80%] h-[70%] grid grid-cols-3 gap-6"
onClick={(e)=>e.stopPropagation()}
>

{/* LEFT BIO */}

<div className="text-gray-300 overflow-y-auto">

<h2 className="text-2xl text-red-400 mb-4">
Biography
</h2>

<p>{hero.bio}</p>

</div>


{/* CENTER IMAGE */}

<div className="flex flex-col items-center justify-center">

<img
src={hero.image}
className="h-72 rounded-lg"
/>

<h1 className="text-white text-2xl mt-4">
{hero.name}
</h1>

<p className="text-red-400">{hero.title}</p>

</div>


{/* RIGHT TIMELINE */}

<div className="overflow-y-auto">

<h2 className="text-2xl text-red-400 mb-4">
Timeline
</h2>

{hero.timeline.map((t,i)=>(

<div key={i} className="mb-4 border-l border-red-500 pl-4">

<p className="text-red-300">{t.year}</p>

<p className="text-gray-300">{t.event}</p>

</div>

))}

</div>

</motion.div>

</motion.div>

)

}