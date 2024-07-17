import axios from 'axios';
import React, { useEffect, useState } from 'react'

function FAchApi() {
    const [data , setData ] = useState([])
    const apiData = async ()=>{
        const data  = await axios.get(`https://api.publicapis.org/entries`)
        setData(data.data.entries);
}
useEffect(()=>{
    apiData()
} , [])
  return (
    <div>
    {
        data.map((e)=><div>
            <p>
                {e.Category}
            </p>
        </div>)
    }

      
    </div>
  )
}

export default FAchApi
