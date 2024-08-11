import React, { useEffect } from 'react';
//narcanform 
import NarcanForm from "../components/NarcanForm"

const RequestNarcan = ()=>{

    useEffect(()=>{
        document.title = 'Request Narcan | Prevent Overdose Inc.'
    },[])

    
    return(
        <div className="form" >
            <NarcanForm/>
        </div>
    )
}

export default RequestNarcan
