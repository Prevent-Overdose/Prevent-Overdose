import React, { useEffect, useState } from "react";
import "./FoundersPage.css"; 
import founder1 from '../images/Cole Olson New Headshot.jpg';
import founder1Title from '../images/Cole Olson CG.png';
import founder2 from '../images/Samay_Shah_New_Headshot.jpg';
import founder2Title from '../images/Samay Shah CG.png';
import founder3 from '../images/Khanheadshot.png';
import founder3Title from '../images/Saif Khan CG.png';

import videoFile from '../images/Black Silk Background.mp4'; // Import the video file

const FoundersPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
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


    return (
        <div className="founders-page-container">
            {isMobile ? (
                <div className="mobile-background" style={{ backgroundColor: 'black'}}></div>
            ) : (
                <video autoPlay loop muted className="founders-video">
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Economica'}}>FOUNDERS</h1>
            <p>
            Founded by three passionate University of South Florida undergraduates 
             Prevent Overdose embodies the vision of empowering students to enact
             meaningful change within their communities. With a shared commitment to
             addressing the critical issue of overdose prevention through education
             advocacy, and community engagement, our founders lead a diverse team
             of individuals to be active in the welfare of their communities.
            
            </p>
            
            <div className="box-container">
                <div className="box-wrapper">
                    <div className="box">
                        <img src={founder1} alt="Image 1" />
                        <div className="description">
                        My experience of losing both friends and family members due to drug use fueled my desire for change and inspired me to found this organization.
                        </div>
                    </div>
                    <div className="additional-image-container">
                            <img src={founder1Title} alt="Additional Image 1" className="additional-image" /> {/* Additional image below the first box */}
                            <h3 style={{fontSize: '17px', fontFamily: 'nunito sans'}}>Co-Executive Director</h3>
                        <div className="position-container">
                            <a href="https://www.linkedin.com/in/cole-olson-47b881262/" target="_blank " class="fa fa-linkedin">
                            </a>
                        </div>
                    </div>
                </div>

                <div className="box-wrapper">
                    <div className="box">
                        <img src={founder2} alt="Image 2" />
                        <div className="description">
                        Seeing people fight addiction while volunteering at my local harm reduction clinic inspired me to do everything I can to make the fight easier.
                        </div>
                    </div>
                    <div className="additional-image-container">
                        <img src={founder2Title} alt="Additional Image 2" className="additional-image" /> {/* Additional image below the second box */}
                        <h3 style={{fontSize: '17px', fontFamily: 'nunito sans'}}>Co-Executive Director</h3>
                        <div className="position-container">
                            <a href="https://www.linkedin.com/in/samay-shah-9946011b6/" target="_blank " class="fa fa-linkedin">
                            </a>
                        </div>
                    </div>
                </div>

                <div className="box-wrapper">
                    <div className="box">
                        <img src={founder3} alt="Image 3" />
                        <div className="description">
                        After losing a close friend to an opioid overdose I was motivated to work to address the problem of overdoses within our community and provide support to those struggling with addiction.
                        </div>
                    </div>
                    <div className="additional-image-container">
                        <img style={{width: '1000px', height: '20px'}}src={founder3Title} alt="Additional Image 3" className="additional-image" /> {/* Additional image below the third box */}
                        <h3 style={{fontFamily: 'nunito sans', fontSize: '17px'}}>Chief Financial Officer</h3>
                        <div className="position-container">
                            <a href="https://www.linkedin.com/in/saif-khan-80395630a/" target="_blank " class="fa fa-linkedin">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default FoundersPage;
