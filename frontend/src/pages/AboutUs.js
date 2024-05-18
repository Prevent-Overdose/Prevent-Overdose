import { useEffect } from "react";
import LeadershipTitle from '../images/Leadership CG.png';
import applyToJoin from '../images/Apply To Join.png';

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us";
    }, []);
    
    return (
        <div className="AboutUs-page">
            <div className="leadership-image-container">
                <button style={{ fontSize: '55px'}} className="button-left">Founders</button>
                <img src={LeadershipTitle} alt="Leadership Title" />
                <button style={{ fontSize: '55px'}} className="button-right">Board</button>
            </div>
            <p style={{ fontSize: '20px', marginTop: '50px'}}>Empowering Change: Student Leaders Committed to the Equitable</p>
            <p style={{ fontSize: '20px'}}>Distribution of Harm Reduction Service Nationwide</p>
            <div className="apply-image-container">
                <img src={applyToJoin} alt="apply Image" className="apply-image" />
            </div>
        </div>
    );
};

export default AboutUs;