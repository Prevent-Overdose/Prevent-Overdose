import { useEffect, useState } from "react";
import LeadershipTitle from '../images/Leadership CG.png';
import applyToJoin from '../images/Apply To Join.png';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import videoFile from '../images/Black White Smoke.mp4'; // Import the video file
import "./AboutUs.css"; // -Import the CSS file
import ODMap from './ODMap.jsx';

const AboutUs = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        document.title = "About Us | Prevent Overdose Inc.";
        // Check if the screen width is less than or equal to 480px (mobile view)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        handleResize(); // Call the function once to set initial state
        window.addEventListener("resize", handleResize); // Add event listener for window resize
        return () => {
            window.removeEventListener("resize", handleResize); // Remove event listener on component unmount
        };
    }, []);

    const openApplyForm = () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSchJX9mrvrWZnGEPkzjvFO7bW55HNFMbUMwDsSF9qbmeL_fRQ/viewform?usp=sf_link", "_blank");
    };

    return (
        <div className="AboutUs-page">            
            <div className="leadership-image-container">
                <Link to="/founders" className="button-left">FOUNDERS</Link>
                <h1>LEADERSHIP</h1>
                <Link to="/board" className="button-right">BOARD</Link> 
            </div>
            <p style={{ fontSize: '23px', marginTop: '40px', fontFamily: 'nunito sans'}}>Empowering Change: Student Leaders Committed to the Equitable <br /> Distribution of Harm Reduction Service Nationwide</p>
            
            {/* Conditionally render the apply image container */}
                <div className="apply-image-container">
                        <img src={applyToJoin} alt="Apply to Join" className="apply-image" onClick={openApplyForm} />
                </div>
                


                <ODMap /> 
        </div>
    );
};

export default AboutUs;
