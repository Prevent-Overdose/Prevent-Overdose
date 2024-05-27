import React, { useState } from "react";
import "../board.css"; 
import board1 from '../images/Rahul Chari Headshot (1).jpg';
import board2 from '../images/Rutvi Shukla Headshot.png';
import board3 from '../images/Anteneh Zewdie Headshot.jpg';
import board4 from '../images/DanielDsouza Headshot.png';

import founder1 from '../images/Cole Olson New Headshot.jpg';
import founder2 from '../images/Samay_Shah_New_Headshot.jpg';

import countyDirector1 from '../images/Devika Kumar Headshot .jpg';
import countyDirector2 from '../images/Nebiyou Daniel Headshot.jpg';
import countyDirector3 from '../images/Khanheadshot.png';

const BoardPage = () => {
    const [dropdowns, setDropdowns] = useState({
        founders: true,
        softwareTeam: true,
        alachua: true
    });

    const toggleDropdown = (section) => {
        setDropdowns(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };


    const renderSparkles = () => {
        const sparkles = [];
        for (let i = 0; i < 10; i++) {
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
            };
            sparkles.push(<div className="sparkle" style={style} key={i}></div>);
        }
        return sparkles;
    };

    return (
        <div className="board-container">
            <h1 className="board-heading">MEET THE BOARD</h1>
            <div className="team-section" id="founders">
                <button className="team-heading" onClick={() => toggleDropdown('founders')}>
                    Co-Executive Directors
                </button>
                {dropdowns.founders && (
                    <div className="box-container">
                        <div className="box">
                            <img src={founder1} alt="Founder 1" />
                            <div className="description">
                                <p>COLE OLSON
                                <br></br>
                                <br></br> My experience of losing both friends and family members due to drug use fueled my desire for change and inspired me to found this organization.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <img src={founder2} alt="Founder 2" />
                            <div className="description">
                                <p>SAMAY SHAH 
                                <br></br>
                                <br></br> Seeing people fight addiction while volunteering at my local harm reduction clinic inspired me to do everything I can to make the fight easier.
                                
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="team-section" id="alachua">
                <button className="team-heading" onClick={() => toggleDropdown('alachua')}>
                    County Directors
                </button>
                {dropdowns.alachua && (
                    <div className="box-container">
                        <div className="box">
                            <img src={countyDirector1} alt="countyDirector 1" />
                            <div className="description">
                                <p>DEVIKA KUMAR
                                <div className="position">Allegheny County Director </div>
                                <br></br>Seeing the widespread impact of overdose death in my community drives me to prevent suffering through education and harm reduction initiatives. 
                                </p>
                            </div>
                        </div>

                        <div className="box">
                            <img src={countyDirector2} alt="countyDirector 2" />
                            <div className="description">
                                <p>NEBIYOU DANIEL
                                <div className="position">Pinellas County Director </div>
                                <br></br> Seeing the toll overdoses took on my community and family in Pinellas County motivated me to take action.
                                </p>
                            </div>
                        </div>

                        <div className="box">
                            <img src={countyDirector3} alt="countyDirector 3" />
                            <div className="description">
                                <p>SAIF KHAN
                                <br></br>
                                <br></br> After losing a close friend to an opioid overdose I was motivated to work to address the problem of overdoses within our community and provide support to those struggling with addiction.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="team-section" id="software-team">
                <button className="team-heading" onClick={() => toggleDropdown('softwareTeam')}>
                    Software Development Team
                </button>
                {dropdowns.softwareTeam && (
                    <div>
                        {/* Separate container for Project Manager */}
                        <div className="board1-container"> 
                            <div className="box">
                                <img src={board1} alt="Board Member 1" />
                                <div className="description">
                                    <div className="name" style={{marginTop: '-30px'}}>RAHUL CHARI</div>
                                    <div className="position">Project Manager</div>
                                    <br></br>
                                    <div className="description-text">
                                        I want to use my technical experience to combat real-world issues and witness meaningful change in my community.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-container">
                            <div className="box">
                                <img src={board2} alt="Board Member 2" />
                                <div className="description">
                                RUTVI SHUKLA
                                <div className="position">Software Developer</div>
                                <br></br>
                                I aspire to apply my software development skills to tackle real-world issues related to drug overdose and drive meaningful change in the community.  
                                </div>
                            </div>
                            <div className="box">
                                <img src={board3} alt="Board Member 3" />
                                <div className="description">
                                ANTENEH ZEWDIE
                                <div className="position">Software Developer</div>
                                <br></br>
                                Gain real-world experience by applying my technical skills to developing a platform with resources for those who are struggling with or combating
                                <br></br>   
                                <br></br>
                                </div>
                            </div>
                            <div className="box">
                                <img src={board4} alt="Board Member 4" />
                                <div className="description">
                                DANIEL D'SOUZA
                                <div className="position">Software Developer</div>
                                <br></br>
                                My goal was to use my technical expertise to create an application that tackles pressing issues in today’s world and benefits society in a meaningful manner.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {renderSparkles()}
        </div>
    );
};

export default BoardPage;
