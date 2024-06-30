import React, { useEffect, useState } from 'react';
import { TextField,Tooltip, IconButton } from '@mui/material/';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './reportOverdose.css'


const ReportOverdose = ()=>{

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        document.title = "Report Overdose | Prevent Overdose Inc.";
    }, []);

    
    return (
        <div>
            <div className="container">
            <h1 style={{fontSize: '50px', textAlign: 'center', paddingTop: '30px', fontFamily: 'Bebas neue, Lucida Console, Courier New, monospace'}}>MAKE A DIFFERENCE</h1>
            <div >

                <div className="preamble">Our overdose reporting form is a three 
                    question monthly survey sent to participating 
                    individuals's phone numbers on the 10th of each month. 
                    We are using this information to better distribute services 
                    equitably in our own communities. <br /> <br />Once you fill out 
                    this online form the questions will be sent to your phone number.
                </div>
                <br />
                
                <div>
                    <span>Provide an address of the nearest park in your area: </span>
                    <Tooltip title="Nearest park location is a way
                     to maintain reporter anonymity and give nonprofit 
                     organizations location-specific information to 
                     help communities in-need.">
                        <IconButton>
                            <HelpOutlineIcon fontSize="small" className='custom-icon'/>
                        </IconButton>
                    </Tooltip>
                    
                    <br />
                    <TextField
                        type="text"
                        name="address"
                        //value={}
                        placeholder=" Enter address"
                        //onChange={}
                        required
                        style={{ background: 'black' }}
                    />
                </div>
            
                <div>
                <span>Zipcode:</span>
                <br />
                <TextField
                    type="text"
                    name="address"
                    //value={}
                    placeholder=" Enter zipcode"
                    //onChange={}
                    required
                    style={{ background: 'black' }}
                />
                </div>
                <div>
                <span>What is your phone number? :</span>
                <br />
                <TextField
                    type="text"
                    name="phoneNumber"
                    //value={}
                    placeholder=" Enter phone number"
                    //onChange={}
                    required
                    style={{ background: 'black' }}
                />
                </div>
               
                <br />
                <div className="submit-btn">
                    <button type="submit" class="btn btn-dark" >Submit</button>
                </div>
            </div>
            
            </div>
            
            
        </div>

        
    );
}

export default ReportOverdose