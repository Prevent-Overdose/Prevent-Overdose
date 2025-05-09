import React, { useRef, useEffect } from "react";
// import group1 from "../../images/group1.png";
import electrocardiogram from "../../images/electrocardiogram.mp4";

const VisionSection = () => {
    const videoRef = useRef(null);
    let hasPlayed = false;

    useEffect(() => {
        const video = videoRef.current; 

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasPlayed) {
                    if (video) {
                        video.play();
                        hasPlayed = true;
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.9
        })
       
        if (video) {
            observer.observe(video);
        }

        return () => {
            if (video) {
                observer.unobserve(video);
            }
        };
    }, []);
    
    return (
        <div className="vision-section">
            {/* Use commented section if image is more preferred */}
            {/* <div  className="gradient-container"> */}
                {/* <div className="vision-text">
                    <h1 className="vision-heading">OUR VISION</h1> 
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize:'24px'}}>We envision a future where drug overdose is eliminated, and every life is empowered with health, hope, and opportunity.</span>
                </div> */}
                {/* <img src={group1} alt="Group1" className="vision-image" /> */}
                <video 
                    ref={videoRef}
                    src={electrocardiogram} 
                    muted 
                    playsInline
                    preload="none"
                />
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