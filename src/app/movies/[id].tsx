import VoteAverage from "./../components/MoviesPage/MoviePage/VoteAverage";
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/";

type genre = {
    name:string,
    id:number,
}
interface props{
    movie:{
        id:string,
        title:string,
        poster_path:string,
        backdrop_path:string,
        release_date:string,
        runtime:number,
        genres:[genre],
        overview:string | undefined,
        vote_average:number,
        tagline:string|undefined
    },
    width:number|undefined,
}


const Movie: React.FC <props> = ({movie,width}) => {
    return (
        <main className='grow relative min-w-full '>
        <Head>
            <title>{movie.title}</title>
        </Head> 
            {movie &&
            <>
                <div className="absolute w-full h-full" >
                    <Image fill={true} priority={true} blurDataURL={imagePath + "w500" + movie.backdrop_path}
                    className="object-cover"
                    quality={50} src={imagePath + "original" + movie.backdrop_path} alt="" />
                    <div className="absolute  w-full h-full" style={{background: "rgba(61,61,64,0.7)"}}></div>
                </div>
                <div className="max-w-5xl mt-5 z-10 h-fit sm:h-full flex flex-col sm:flex-row items-center mx-auto">
                    <div className="relative hover:scale-95 transition-all duration-100" 
                        style={{
                            width:"200px",
                            height:"300px",
                            aspectRatio:"2/3",
                            alignItems:"center"
                        }}>
                        <Image className="rounded-md relative" priority={true} src={imagePath + "original" + movie.poster_path} 
                        blurDataURL={imagePath + "w300" + movie.backdrop_path}
                        quality={30} width={200} height={300} alt="" />
                    </div>
                    <div className="relative h-fit">
                        <div className=" text-2xl sm:text-4xl px-2 text-center sm:text-left">
                            <span className="font-bold"><Link href={"/movies/" + movie.id}>{movie.title}</Link></span>  
                            <span className=" text-lg sm:text-3xl text-gray-300"> ({movie.release_date.slice(0,4)})</span>
                        </div>
                        <div className="flex flex-row p-2 bg-slate-300/[0.5]  sm:bg-none">
                            <ul className="sm:list-disc flex flex-col sm:flex-row justify-between">
                                <li className="mx-2">
                                    <ul className="list-none flex flex-row">
                                        {movie.genres.map( (genre) =>
                                            <li key={genre.id} className="px-2 font-bold hover:text-blue-300">
                                                <Link href={`/genres/${genre.id}`+`?genre_name=${genre.name.toLowerCase()}`}>
                                                    {genre.name}
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                <li className="mx-2 ">{ runtime(movie.runtime)}</li>
                            </ul>
                        </div>
                        <div className="relative flex h-[70px] flex-row mx-5 my-2 " style={{alignItems:"center"}}>
                            <VoteAverage vote_average={movie.vote_average}/>
                            <div className="absolute left-[75px] col-1">
                                <div>User</div>
                                <div>Score</div>
                            </div>
                        </div>
                        <div className="pb-2 mb-4 px-2">
                            {movie.tagline !==undefined &&
                                <p className="text-md sm:text-lg font-extralight text-gray-100 py-2"><i>{movie.tagline}</i></p>
                            }
                            <h2 className="text-lg sm:text-xl mb-2 font-bold">Overview</h2>
                            {movie.overview !== undefined &&
                            <p className="text-md">{movie.overview}</p>
                        }
                        </div>
                    </div>
                </div>
            </>
            }
        </main>
    );
}

type context = {
    params:{
        id:string;
    }
}

export const getServerSideProps = async(context:context) =>{
    const apiKey = process.env.API_KEY
    const data = await fetch(`https://api.themoviedb.org/3/movie/${context.params.id}?api_key=${apiKey}`)
    const movie = await data.json()
    return {props:{movie}}
} 

export default Movie;


function runtime (movieRuntime:number){
    let run = movieRuntime
    let result:string = ""
    let i = 0
    while(run >= 60){
        i++
        run -= 60
    }
    if(i>0)
        result = i.toString() + "h "
    if(run>0)
        result = result + run + "min" 
    return result
}