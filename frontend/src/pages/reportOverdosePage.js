import React, { useEffect, useState } from 'react';
//narcanform 
import NarcanForm from "../components/narcanForm"


const ReportOverdose = ()=>{

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
        document.title = 'Report Form';
        
    },[])

    
    return (
        <div>
            <div className="container">
            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Bebas neue, Lucida Console, Courier New, monospace'}}>MAKE A DIFFERENCE</h1>
            <div className="p-3 shadow rounded border" style={{ backgroundColor: '#343a40', border: '1px solid #ccc' }}>
                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>How many fatal overdoses have you seen in the past month?</label>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3" style={{ backgroundColor: '#dee2e6' }}>Number of Fatal Overdoses</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>

                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>How many non-fatal overdoses have you seen in the past month?</label>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3" style={{ backgroundColor: '#dee2e6' }}>Number of Non-Fatal Overdoses</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>

                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>How many overdoses have you reversed with our Narcan in the past month?</label>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3" style={{ backgroundColor: '#dee2e6' }}>Number of Overdoses Reversed</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>

                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>Please provide your zip code so we can better understand the geographic distribution of overdose incidents.</label>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3" style={{ backgroundColor: '#dee2e6' }}>Zip Code</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>

                <label for="basic-url" class="form-label" style={{fontFamily: 'Bebas Neue', fontSize: 25}}>Enter your phone number if you would like to sign up for monthly overdose reporting surveys.</label>
                <div class="input-group mb-3">
                <div class="input-group-text" style={{ backgroundColor: '#dee2e6' }}>
                    <input class="form-check-input mt-0" type="checkbox" value="" onChange={() => setIsDisabled(!isDisabled)}/>
                </div>
                <span class="input-group-text" id="basic-addon3" style={{ backgroundColor: '#dee2e6' }}>Phone Number</span>
                <input type="text" class="form-control" id="basic-url" disabled={isDisabled}/>
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
            </div>
            
            </div>
            
            
        </div>

        
    );
}

export default ReportOverdose