import React from "react";
import group1 from "../../images/group1.png";
import electrocardiogram from "../../images/electrocardiogram.mp4";

const VisionSection = () => {
    return (
        <div className="vision-section">
            {/* Use commented section if image is more preferred */}
            {/* <div  className="gradient-container"> */}
                {/* <div className="vision-text">
                    <h1 className="vision-heading">OUR VISION</h1> 
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize:'24px'}}>We envision a future where drug overdose is eliminated, and every life is empowered with health, hope, and opportunity.</span>
                </div> */}
                {/* <img src={group1} alt="Group1" className="vision-image" /> */}
                <video src={electrocardiogram} autoPlay muted />
                <div className="vision-gradient-container"></div>
                <div className="vision-text">
                    <h1 className="vision-heading">OUR VISION</h1> 
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize:'24px'}}>We envision a future where drug overdose is eliminated, and every life is empowered with health, hope, and opportunity.</span>
                </div>
            {/* </div> */}
        </div>
    );
};

export default VisionSection;