import React, { useEffect } from 'react';
//narcanform 
import NarcanForm from "../components/narcanForm"

const RequestNarcan = ()=>{

    useEffect(()=>{
        document.title = 'Request Form'
    },[])

    
    return(
        <div className="form" >
            <NarcanForm/>
        </div>
    )
}

export default RequestNarcan