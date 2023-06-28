"use client"
import { useEffect, useState } from "react"

interface props{
    date:string | string[],
    setDate:any,
    release_date_gte:string | string[] | undefined,
    release_date_lte:string | string[] | undefined ,
}
const todayDate = new Date()
const year = todayDate.getFullYear()
const month= todayDate.getMonth() + 1
const day = todayDate.getDate()
const today = year + "-" + (month/10 < 1?"0":"") + month + "-" + (day/10 <1?"0":"") + day

const DateInput: React.FC <props> = ({date, setDate, release_date_gte, release_date_lte}) => {
    const [fromDate, setFromDate] = useState<string | string[] | undefined>(release_date_gte !== undefined?release_date_gte:"")
    const [toDate, setToDate] = useState<string | string[] | undefined>(release_date_lte !== undefined?release_date_lte:today)
    const releaseGte = "release_date_gte="
    const releaseLte = "release_date_lte="
    //param date  yyyy-mm-dd

    useEffect(()=>{
        if(fromDate !== "")
            if(toDate !== "")
                setDate(releaseGte + fromDate + "&" + releaseLte + toDate)
            else setDate(releaseGte + fromDate)
        if(fromDate === "")
            if(toDate !== "")
                setDate(releaseLte + toDate)
            else setDate("")
    },[fromDate,toDate])

    useEffect(()=>{
        if(toDate !== "")
            if(fromDate !== "")
                setDate(releaseGte + fromDate + "&" + releaseLte + toDate)
            else 
                setDate(releaseLte + toDate)
        if(toDate === "")
            if(fromDate !== "")
                setDate(releaseGte + fromDate)
        else setDate("")
    },[toDate,fromDate])

    return (
        <form>
            <section className='flex flex-row justify-between py-1'>
                <label htmlFor="first-date">From:</label>
                <input className='bg-dark_gray' type="date" defaultValue={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
            </section>
            <section className='flex flex-row justify-between py-1'>
                <label htmlFor="last-date">To:</label>
                <input className='bg-dark_gray' type="date" defaultValue={toDate == undefined ? today : toDate} onChange={(e)=>setToDate(e.target.value)} />
            </section>
        </form>
    );
}
 
export default DateInput;