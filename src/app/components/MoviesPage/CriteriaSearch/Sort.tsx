"use client"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useEffect, useState} from 'react'

const options = [
    {name:"Popularity Descending",value:"popularity.desc"},
    {name:"Popularity Ascending",value:"popularity.asc"},
    {name:"Rating Descending",value:"revenue.desc"},
    {name:"Rating Ascending",value:"revenue.asc"},
    {name:"Release Date Descending",value:"release_date.desc"},
    {name:"Release Date Ascending",value:"release_date.asc"},
    {name:"Title [A-Z]",value:"original_title.desc"},
    {name:"Title [Z-A]",value:"original_title.asc"},
]

interface props{
    option:string | string[] | undefined,
    setOption:any,
}

const Sort: React.FC <props>= ({option, setOption}) => {
    const [collapse, setCollapse] = useState<boolean>(true)

    function handleOption(e:any){
        setOption(e.target.value)
    }

    return (
        <div className='text-base gray border-2 border-slate-300 rounded '>
            <div className="cursor-pointer flex flex-row justify-between p-4 " onClick={()=>setCollapse(!collapse)}>
                <p className='text-lg'>Sort</p>
                {collapse && <KeyboardArrowDownIcon/>}
                {!collapse && <KeyboardArrowRightIcon/>} 
            </div>
            {collapse &&
                <div className='border-t-2 '>
                    <div className='p-4'>
                        <p className='text-lg'>Sort Results By</p>
                        <select onChange={(e:any) =>handleOption(e)} className='my-2 p-2 sort-filter w-full' defaultValue={option}>
                            {options.map(op=>
                                <option key={op.value} className='hover:bg-white text-base' 
                                value={op.value}
                                style={{
                                    fontWeight:option==op.value?"bold":"", 
                                    backgroundColor:option==op.value?"var(--gray)":"",
                                }}
                                >
                                    {op.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Sort;