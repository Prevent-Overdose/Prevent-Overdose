import { useEffect } from "react"
import {Link} from 'react-router-dom';





const Resources = ()=>{
    useEffect(()=>{
        document.title = "Resources"
    },[])
    return(
        
        <div className="Resources-page">
            <h1>Resources</h1>
                <div className="recognition">

                    <p className="Our-response">We have distributed $75,000 worth of Narcan, an opioid overdose 
                        reversal drug, to over 400 low-income and 
                        unhoused individuals at no cost. We have 
                        documented at least eight successful overdose 
                        reversals, equivalent to saving at least 
                        twelve lives in the last year. We have divisions in Gainesville, 
                        Tampa, St. Pete, and Pittsburgh. We are 
                        continually expanding and aiming to open more 
                        divisions across Florida and in the Northeast to 
                        meet an ever growing need. 
                    </p>
                </div>



                <div className="card">
                    <Link to = 'https://gsomxcc.brightspace.com/course/19/saret-screening-for-substance-use-disorders'>
                     <img className="card-image" src={require('../images/Nyu1.png')} alt="Screening for Substance Use module" />
                    </Link>
                    <h2 className="card-title">Learn More</h2>
                    <p className="card-text"></p>
                </div>    

                <div className="card">
                    <Link to='https://gsomxcc.brightspace.com/course/13/saret-personal-impact-of-substance-use'>
                    <img className="card-image" src={require('../images/Nyu2.png')} alt="Personal Impact of Substance module" />
                    </Link>
                    <h2 className="card-title">Learn More</h2>
                    <p className="card-text"></p>
                </div>  

                <div className="card">
                    <Link to='https://gsomxcc.brightspace.com/course/17/saret-epidemiology-of-substance-use-disorders'>
                    <img className="card-image" src={require('../images/Nyu3.png')} alt="Personal Impact of Substance module" />
                    </Link>
                    <h2 className="card-title">Learn More</h2>
                    <p className="card-text"></p>
                </div>  

                <div className="card">
                    <Link to='https://gsomxcc.brightspace.com/course/18/saret-treatment-modalities-for-substance-use-disorders'>
                    <img className="card-image" src={require('../images/Nyu4.png')} alt="Personal Impact of Substance module" />
                    </Link>
                    <h2 className="card-title">Learn More</h2>
                    <p className="card-text"></p>
                </div> 















            </div>

        
        

    )
}

export default Resources