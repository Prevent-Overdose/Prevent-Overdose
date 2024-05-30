import React, { useEffect } from 'react';
//narcanform 
import NarcanForm from "../components/narcanForm"


const ReportOverdose = ()=>{

    useEffect(()=>{
        document.title = 'Report F  orm';
        
    },[])

    
    return (
        <div>
            <div className="container">
            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Bebas Neue, Lucida Console, Courier New, monospace'}}>MAKE A DIFFERENCE</h1>
            <div className="p-3 shadow rounded border" style={{ backgroundColor: '#343a40', border: '1px solid #ccc' }}>
                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>Enter your phone number to sign up for monthly overdose reporting surveys.</label>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">Phone Number</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
            </div>
            
            </div>
            
            
        </div>

        
    );
}

export default ReportOverdose