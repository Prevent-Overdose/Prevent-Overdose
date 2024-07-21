import React, { useEffect, useState } from "react";
import "./FoundersPage.css"; 
import founder1 from '../images/Cole Olson New Headshot.jpg';
import founder1Title from '../images/Cole Olson CG.png';
import founder2 from '../images/Samay_Shah_New_Headshot.jpg';
import founder2Title from '../images/Samay Shah CG.png';
import founder3 from '../images/Khanheadshot.png';
import founder3Title from '../images/Saif Khan CG.png';

const FoundersPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        document.title = "Founders | Prevent Overdose Inc.";
        
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

            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Bebas Neue'}}>FOUNDERS</h1>
            <p>
            Founded by three passionate University of South Florida undergraduates 
             Prevent Overdose embodies the vision of empowering students to enact
             meaningful change within their communities. With a shared commitment to
             addressing the critical issue of overdose prevention through education,
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
                            <h2>COLE OLSON</h2>
                            <h3 style={{fontSize: '12px', fontFamily: 'nunito sans'}}>Co-Executive Director</h3>
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
                        <h2>Samay Shah</h2>
                        <h3 style={{fontSize: '12px', fontFamily: 'nunito sans'}}>Co-Executive Director</h3>
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
                        <h2>SAIFULLAH KHAN</h2>
                        <h3 style={{fontFamily: 'nunito sans', fontSize: '12px'}}>Chief Financial Officer</h3>
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
