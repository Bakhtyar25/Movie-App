"use client"
import { useRouter ,useSearchParams } from "next/navigation";
import {useState, useEffect} from 'react'
import Filters from "./Filters";
import Sort from "./Sort";

interface props{
    genres:{
        genres:[{
            id:number,
            name:string
        }]
    }   
}

type filterQuery = {
    selectedGenres:string | undefined | string [],
    runtime:string | undefined,
    date:string | undefined,
}

const CriteriaSearch: React.FC<props> = ({genres}) => { 
    const router = useRouter();
    let {sort_by}:any = useSearchParams()

    const [sortQuery, setSortQuery] = useState<string | string[] | undefined>(sort_by !== undefined ? sort_by : undefined)
    const [filterQuery, setFilterQuery] = useState<filterQuery | undefined>()

    //page logic
    let {page}:any = useSearchParams()
    if(page != '1' || page == undefined)
        page = '1'

    const [search, setSearch] = useState<boolean>(false)
    const [navigate, setNavigate] = useState<boolean>(false)
    const linkBase = "/movies?"
    const [link, setLink] = useState<string>(linkBase)
    
    useEffect(()=>{
        setLink(()=>linkBase)
        if(filterQuery != undefined ){
            if(filterQuery.selectedGenres !== undefined){
                setLink(prev => prev + "with_genres=" + filterQuery.selectedGenres +"&")
            }
            if(filterQuery.runtime !== undefined){
                setLink(prev => prev + filterQuery.runtime + "&")
            }
            if(filterQuery.date !== undefined){
                setLink(prev => prev + filterQuery.date + "&")
            }
        }
        if(sortQuery !== undefined){
            setLink(prev => prev + "sort_by=" + sortQuery + "&")
        }
    },[filterQuery, sortQuery])
    
    useEffect(()=>{
        if(link !== linkBase)
        setSearch(true)
        else setSearch(false)
    },[link])

    useEffect(() => {
        if(search && navigate ){
            router.push(link.slice(0,-1) + "&page=" + page,undefined)
            setSearch(false)
            setNavigate(false)
        }
    },[navigate])


    return (
        <div className="w-2/3 sm:w-[270px] md:mr-10">
            <Sort option={sortQuery} setOption={setSortQuery}/>
            <Filters genres={genres} option={filterQuery} setOption={setFilterQuery} />
            <button disabled={!search} className="bg-sky-500/100 hover:bg-sky-300/100 px-4 py-2 rounded w-full text-lg" onClick={() => setNavigate(true)}>Search</button>
        </div>
    );
}
 
export default CriteriaSearch;