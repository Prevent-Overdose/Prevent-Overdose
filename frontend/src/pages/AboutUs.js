import { useEffect } from "react";
import LeadershipTitle from '../images/Leadership CG.png';
import applyToJoin from '../images/Apply To Join.png';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us";
    }, []);
    
    return (
        <div className="AboutUs-page">
            <div className="leadership-image-container">
                <Link to="/founders" style={{ fontSize: '55px'}} className="button-left">FOUNDERS</Link> {/* Update button to Link */}
                <img src={LeadershipTitle} alt="Leadership Title" />
                <Link to="/board" style={{ fontSize: '55px'}} className="button-right">BOARD</Link> {/* Update button to Link */}
            </div>
            <p style={{ fontSize: '20px', marginTop: '50px'}}>Empowering Change: Student Leaders Committed to the Equitable</p>
            <p style={{ fontSize: '20px'}}>Distribution of Harm Reduction Service Nationwide</p>
            <div className="apply-image-container">
                <Link to="/apply">
                    <img src={applyToJoin} alt="apply Image" className="apply-image" />
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;