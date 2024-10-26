import React from "react";
import group1 from "../../images/group1.png";
import group2 from "../../images/group2.png";
import group3 from "../../images/group3.png";
import stroke from "../../images/brush-stroke.png";

const StorySection = () => {
    return (
        <div className="story-container">
            <div className="story-banner">
            <img src={stroke} alt="Banner" className="banner-image" />
                <div className="story-text">
                    <h1 className="story-header">OUR STORY</h1>
                    <p style={{ fontSize: '17px', marginTop: '10px', fontFamily: 'nunito sans' }}>
                    At the heart of our organization is a mission to save lives and ensure equitable access to harm reduction supplies and education. 
                    As a national nonprofit, we are dedicated to addressing the devastating impact of the opioid crisis, especially for those most likely 
                    to witness or experience an overdose. Our goal is to provide support in three key areas: 
                    <span style={{ marginLeft: '5px', fontSize: '19px', fontFamily: 'Bebas Neue, sans-serif' }}>overdose response, wound care, and education</span>, 
                    while also influencing policy to create lasting change.
                    </p>
                    <p style={{ fontSize: '17px', marginTop: '5px', fontFamily: 'nunito sans' }}>We serve individuals facing some of the greatest challenges in today's opioid epidemic—those in medication-assisted treatment centers, 
                    unhoused individuals suffering from opioid use disorder, and people struggling with chronic pain. Through targeted initiatives, we strive 
                    to meet the unique needs of these communities, working to ensure they have the resources and knowledge necessary for survival and recovery.</p>
                </div>
                <div className="story-images-container">
                    <img src={group1} alt="Group1" className="fade-in group1"/>
                    <img src={group2} alt="Group2" className="fade-in group2"/>
                    <img src={group3} alt="Group3" className="fade-in group3"/>
                </div>
            </div>
        </div>       
    );
}; 

export default StorySection;