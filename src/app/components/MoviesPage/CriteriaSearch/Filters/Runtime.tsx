"use client"
import {useEffect, useState} from 'react'

interface props{
    runtime:string | string[],
    setRuntime:any,
    with_runtime_gte:string | string[] | undefined,
    with_runtime_lte:string | string[] | undefined,
}

const Runtime: React.FC <props> = ({runtime, setRuntime, with_runtime_gte, with_runtime_lte}) => {
    const [minRun, setMinRun] = useState<number>(with_runtime_gte !== undefined ? parseInt(with_runtime_gte.toString()) : 0)
    const [maxRun, setMaxRun] = useState<number>(with_runtime_lte !== undefined ? parseInt(with_runtime_lte.toString()) :400)
    const runGte = "with_runtime_gte="
    const runLte = "with_runtime_lte="
    
    useEffect(()=>{
        let minStr = minRun.toString()
        let maxStr = maxRun.toString()
        if( minStr!== "0")
            if(maxStr !== "400")
              setRuntime(runGte + minStr + "&" + runLte + maxStr)
        else 
            setRuntime(runGte + minStr)
        if(minStr === "0")
            if(maxStr !== "400")
                setRuntime(runGte + maxStr)
        else setRuntime("")
    },[minRun])
    
    useEffect(()=>{
        let minStr = minRun.toString()
        let maxStr = maxRun.toString()
        if(maxStr !== "400")
            if( minStr!== "0")
                setRuntime(runGte + minStr + "&" + runLte + maxStr)
        else 
            setRuntime(runLte + maxStr)
        if(maxStr === "400")
            if(minStr !== "0")
                setRuntime(runGte + minStr)
        else setRuntime("")
    },[maxRun])
    
    
    //help function
    function handleRuntime(e:any, setData:any){
        setData(e.target.value)
    }
    
    return (
        <div className='relative'>
            <section className='p-2 flex flex-col'>
                <label>Min:</label>
                <input className='my-2 bg-dark_gray' type="range" min={0} max={maxRun} step={10} 
                    defaultValue={minRun} onChange={e=>handleRuntime(e,setMinRun)}/>
                <input className="bg-dark_gray" type='number' readOnly={true} min={0} max={maxRun} step={10} 
                    value={minRun} onChange={e=>handleRuntime(e,setMinRun)}/>
            </section>
            <section className='p-2 flex flex-col'>
                <label>Max:</label>
                <input className='my-2 bg-dark_gray' type="range" min={minRun} max={400} step={10} 
                    defaultValue={maxRun} onChange={e=>handleRuntime(e,setMaxRun)}/>
                <input className='text-right bg-dark_gray' readOnly={true} type='number' min={minRun} max={400} step={10} 
                    value={maxRun} onChange={e=>handleRuntime(e,setMaxRun)}/>
            </section>
        </div>
    );
}
 
export default Runtime;