import React, { useEffect } from 'react';
import ReportingForm from "../components/reportingForm"

const RequestNarcan = ()=>{

    useEffect(()=>{
        document.title = 'Report Overdose | Prevent Overdose Inc.'
    },[])

    
    return(
        <div className="form" >
            <ReportingForm/>
        </div>
    )
}

export default RequestNarcan