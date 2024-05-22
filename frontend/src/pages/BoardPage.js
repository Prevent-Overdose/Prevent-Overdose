import React from "react";
import "../foundersPage.css"; 
import board1 from '../images/Rahul Chari Headshot (1).jpg';
import board2 from '../images/Rutvi Shukla Headshot.png';
import board3 from '../images/Anteneh Zewdie Headshot.jpg';
import board4 from '../images/DanielDsouza Headshot.png';

const FoundersPage = () => {
    return (
        <div className="founders-page-container">
            <h1 style={{fontSize: '55px', textAlign: 'center', paddingTop: '90px', fontFamily: 'Lucida Console", "Courier New", monospace'}}>BOARD</h1>
            <div className="box-container">
                <div className="box-wrapper">
                    <div className="box">
                        <img src={board1} alt="Image 1" />
                        <div className="description">
                        I want to use my technical experience to combat real-world issues and witness meaningful change in my community                         </div>
                    </div>
                    <div className="additional-image-container">
                        <h3 style={{fontSize: '15px'}}>Project Manager</h3>
                    </div>
                </div>

                <div className="box-wrapper">
                    <div className="box">
                        <img src={board2} alt="Image 2" />
                        <div className="description">
                        I aspire to apply my software development skills to tackle real-world issues related to drug overdose and drive meaningful change in the community.                       </div>
                    </div>
                    <div className="additional-image-container">
                        <h3 style={{fontSize: '15px'}}>Software Engineer</h3>
                    </div>
                </div>

                <div className="box-wrapper">
                    <div className="box">
                        <img src={board3} alt="Image 3" />
                        <div className="description">
                        Gain real-world experience by applying my technical skills to developing a platform with resources for those who are struggling with or combating addiction.
                        </div>
                    </div>
                    <div className="additional-image-container">
                        <h3>Software Engineer</h3>
                    </div>
                </div>
                <div className="box-wrapper">
                    <div className="box">
                        <img src={board4} alt="Image 3" />
                        <div className="description">
                        My goal was to use my technical expertise to create an application that tackles pressing issues in today’s world and benefits society in a meaningful manner.
                        </div>
                    </div>
                    <div className="additional-image-container">
                        <h3>Software Engineer</h3>
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default FoundersPage;
