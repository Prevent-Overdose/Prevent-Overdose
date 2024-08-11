import React, { useEffect } from 'react';
//narcanform 
import NarcanForm from "../components/UpdateAvailabilityForm"

const UpdateNarcanAvailability = ()=>{

    useEffect(()=>{
        document.title = 'Update Availability | Prevent Overdose Inc.'
    },[])

    
    return(
        <div className="form" >
            <NarcanForm/>
        </div>
    )
}

export default UpdateNarcanAvailability