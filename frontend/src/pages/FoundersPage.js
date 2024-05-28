import React from "react";
import "../foundersPage.css"; 
import founder1 from '../images/Cole Olson New Headshot.jpg';
import founder1Title from '../images/Cole Olson CG.png';
import founder2 from '../images/Samay_Shah_New_Headshot.jpg';
import founder2Title from '../images/Samay Shah CG.png';
import founder3 from '../images/Khanheadshot.png';
import founder3Title from '../images/Saif Khan CG.png';

const FoundersPage = () => {
    return (
        <div className="founders-page-container">
            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Lucida Console", "Courier New", monospace'}}>FOUNDERS</h1>
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
                        <h3 style={{fontSize: '15px'}}>Co-Executive Director</h3>
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
                        <h3 style={{fontSize: '15px'}}>Co-Executive Director</h3>
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
                        <h3>Chief Financial Officer</h3>
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default FoundersPage;
