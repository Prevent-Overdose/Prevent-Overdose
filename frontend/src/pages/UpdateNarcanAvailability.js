import React, { useEffect } from 'react';
//narcanform 
import NarcanForm from "../components/NarcanForm"

const RequestNarcan = ()=>{

    useEffect(()=>{
        document.title = 'Update Availability | Prevent Overdose Inc.'
    },[])

    
    return(
        <div className="form" >
            <NarcanForm/>
        </div>
    )
}

export default RequestNarcan