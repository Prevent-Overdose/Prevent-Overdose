import { useEffect } from "react";
import LeadershipTitle from '../images/Leadership CG.png';
import applyToJoin from '../images/Apply To Join.png';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import videoFile from '../images/Black White Smoke.mp4'; // Import the video file


const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us";
    }, []);
    
    return (
        <div className="AboutUs-page">
            {/* Add the video element here */}
            <video autoPlay loop muted>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            <div className="leadership-image-container">
                <Link to="/founders" className="button-left">FOUNDERS</Link> {/* Update button to Link */}
                <h1>LEADERSHIP</h1>
                <Link to="/board" className="button-right">BOARD</Link> {/* Update button to Link */}
            </div>
            <p style={{ fontSize: '23px', marginTop: '-20px', fontFamily: 'nunito sans'}}>Empowering Change: Student Leaders Committed to the Equitable <br /> Distribution of Harm Reduction Service Nationwide</p>
        {/*           
            <div className="apply-image-container">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSchJX9mrvrWZnGEPkzjvFO7bW55HNFMbUMwDsSF9qbmeL_fRQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                    <img src={applyToJoin} alt="Apply to Join" className="apply-image" />
                </a>
            </div>
    */}
        </div>
    );
};

export default AboutUs;
