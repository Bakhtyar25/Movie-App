import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.API_KEY
type Data = {
  finalGenres:
   [{
    id:number,
    name:string,
    backdrop_path:string,
  }]
}

interface genre{
  id:number,
  name:string,
  backdrop_path:string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
  const fetchGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  const genreBaseApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=`
  const dataGenres = await fetch(fetchGenres)
  const initGenres = await dataGenres.json()
  
  let b = initGenres.genres
  let finalGenres = [] 
  let i=0
  finalGenres = b.map(async(genre:genre) => {
    
    finalGenres[i] = genre
    let genreApi = genreBaseApi + genre.id.toString()
    let sd = await fetch(genreApi)
    let d = await sd.json()
    let n = {...genre, backdrop_path: d.results[getRandomIntInclusive(0,19)].backdrop_path} 
    ++i
    return n
  })
  Promise.all(finalGenres)
    .then((result)=> {
      res.status(200).json(result)})
    .catch((err) => res.status(404))
}


function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
