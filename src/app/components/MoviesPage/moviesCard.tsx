import Link from "next/link";
import ImageFallback from "../ImageWithFallback";

interface props{
    movie:{
        id:number,
        title:string,
        poster_path:string,
    }
}

const MovieCard: React.FC<props> = ({movie}) => {

    return (
        <div className="mx-auto sm:hover:scale-110 transition-all duration-100 flex flex-col object-fill w-full">
            <div className="mx-auto col-1 w-full relative" style={{aspectRatio:"2/3"}}>
                <ImageFallback width={undefined} poster_path={movie.poster_path} priority={true} name={movie.title} />
                <Link className="absolute w-full h-full" href={"/movies/"+movie.id}></Link>
            </div>
            <div>
                <h2 className="text-xl mb-0 m-auto"><Link href={"/movies/"+movie.id}>{movie.title}</Link></h2>
            </div>
        </div>
    );
}
 
export default MovieCard;