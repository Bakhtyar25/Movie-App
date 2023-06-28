
const VoteAverage: React.FC <{vote_average:number}> = ({vote_average}) => {
    const voteAverage:number =  Math.round(vote_average*10)
    let voteBorder:string = ""
    if(voteAverage < 50)
        voteBorder = 'red'
    if(voteAverage >=50 && voteAverage < 80)
        voteBorder = 'yellow'
    if(voteAverage >= 80)
        voteBorder = 'green'
        
    return (
        <div className="absolute rounded-full flex align-middle w-[4em] h-[4em] transition-all duration-300 justify-center bg-gray hover:scale-125" 
            style={{alignItems:"center"}}>
            <div className={"rounded-full border-4 h-5/6 w-5/6 flex justify-center"} style={{borderColor:voteBorder, alignItems:"center"}}>
                <p className="font-bold text-lg">{voteAverage}</p>
                <span style={{fontSize:"0.65em", marginTop:"0px"}}>%</span>
            </div>

        </div>
    );
}
 
export default VoteAverage;