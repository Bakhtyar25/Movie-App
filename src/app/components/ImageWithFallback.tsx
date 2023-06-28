"use client"
import Image from "next/image";
import { useState } from "react";


const imagePath = "https://image.tmdb.org/t/p/"
const imgFallback = "/poster-placeholder.jpg"

interface props{
    poster_path:string,
    name:string,
    width:number | undefined,
    priority:boolean,
}

const ImageFallback: React.FC <props> = ({poster_path, priority, width, name}) => {
    const [imgSrc, setImgSrc] = useState<string>(imagePath + (width !== undefined ? "w" + width.toString() :"original") + poster_path)
    
    return (
        <Image className="rounded w-full" 
        quality={10} src={imgSrc} blurDataURL={imagePath + (width !== undefined && width > 300 ? "w300" : "w200") + poster_path}
        fill={true} 
        sizes="(max-width: 768px) 75vw,
              (max-width: 1200px) 50vw,
              33vw"
        onError={()=>setImgSrc(imgFallback)} 
        alt={name}/>
    );
}
 
export default ImageFallback;