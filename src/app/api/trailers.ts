import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.API_KEY
interface movie{
    backdrop_path:string,
    title:string,
    id:number,
    video:boolean
}
interface moviesPlaying{
    results:[movie]
}

interface videos{
    results:[{
        key:string,
        official:boolean,
        published_at:string,
        type:string,
        site:string,
    }]
}

type Data = {
    trailers:[{
        movie:movie,
        videos:videos
    }]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
    const nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    const videoBaseApi = `https://api.themoviedb.org/3/movie/`
    const dataNowPlaying = await fetch(nowPlaying)
    const moviesPlaying:moviesPlaying = await dataNowPlaying.json()

    let trailers = [] 
    let i=0
    trailers = moviesPlaying.results.map(async(movie:movie) => {
        let videoApi = videoBaseApi + movie.id.toString() + `/videos?api_key=${apiKey}`
        let videoFetch = await fetch(videoApi)
        let videoData:videos = await videoFetch.json() 
        let endLoop = false
        let j = 0
        while(j < videoData.results.length && !endLoop){
            if(videoData.results[j].type === "Trailer" && videoData.results[j].site === "Youtube"){
                videoData.results[0] = videoData.results[j]
                endLoop = true
            }
            j++
        }

        ++i
        if(videoData.results !== undefined && videoData.results.length > 0)
            return {...movie, videoData}
        return {...movie}
    })

    Promise.all(trailers)
        .then((result)=> {
            res.status(200).json(result)})
        .catch((err) => res.status(404))
}