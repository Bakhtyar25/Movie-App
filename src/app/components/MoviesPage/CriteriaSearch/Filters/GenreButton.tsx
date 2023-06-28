"use client"

import { useEffect, useState } from "react";

interface props{
    name:string,
    id:number,
    selectedGenres:string | string[],
    setSelectedGenres:any,
    with_genres:string | string[] | undefined,
}

const Button: React.FC <props> = ({name, id, selectedGenres, setSelectedGenres, with_genres}) => {
    const [active, setActive] = useState<boolean>(false)

    useEffect(()=>{
        if(with_genres !== undefined){
            const withGenres = with_genres.toString().split(",")
            withGenres.map(genre=> {
                if(genre === id.toString()) 
                setActive(true)
            })
        }
    },[with_genres])

    function handleActive(){
        setActive(!active)
    }

    useEffect(()=>{
        if(selectedGenres != ""){
            let gen = selectedGenres.toString().split(",") 
            let genresArr = gen.filter(genre => genre !== "")

            let checkExist = genresArr.includes(id.toString())

            let result = []
            if(checkExist && !active){
                if(genresArr.length > 0)
                    genresArr.forEach(genre =>{
                        if(genre !== id.toString())
                            result.push(genre)
                    })
            }
            if(!checkExist && active){
                if(genresArr.length > 0)
                    genresArr.forEach(genre =>{
                        result.push(genre)
                    })
                result.push(id.toString())
            }
            setSelectedGenres(result.join(","))
        }else if(active)
            setSelectedGenres(id.toString() + ",")
    },[active])

    return (
        <div className="py-0.5">
            <button className='w-full hover:font-bold p-1 hover:px-3 ease-in-out duration-100' 
                style={{
                    border:active?"2px solid white":"none",
                    borderRadius:active?"7px":""
                }} 
                onClick={handleActive}>
                {name}
            </button>
        </div>
    );
}
 
export default Button;