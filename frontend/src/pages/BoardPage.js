import React, { useState, useEffect } from "react";
import "./Board.css"; 
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

    useEffect(()=>{
        document.title = 'Executive Board | Prevent Overdose Inc.'
    },[])

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
            <h1 className="board-heading" style={{fontFamily:'Bebas Neue'}}>MEET THE BOARD</h1>

            <div className="team-section" id="founders">
                <button className="team-heading" onClick={() => toggleDropdown('founders')}>
                    Executives
                </button>
                {dropdowns.founders && (
                    <div className="box-container">
                        <div className="box-wrapper">
                            <div className="box">
                                <img src={founder1} alt="Founder 1" />
                                <div className="description">
                                    My experience of losing both friends and family members due to drug use fueled my desire for change and inspired me to found this organization.
                                </div>
                            </div>
                            <div className="additional-image-container">
                                <h3 className="name">COLE OLSON</h3>
                                <div className="position">Co-Executive Director</div>
                                <div className="position">Alachua County Director</div>
                            </div>
                        </div>
                        <div className="box-wrapper">
                            <div className="box">
                                <img src={founder2} alt="Founder 2" />
                                <div className="description">
                                    Seeing people fight addiction while volunteering at my local harm reduction clinic inspired me to do everything I can to make the fight easier.
                                </div>
                            </div>
                            <div className="additional-image-container">
                                <h3 className="name">SAMAY SHAH</h3>
                                <div className="position">Co-Executive Director</div>
                            </div>
                        </div>
                        <div className="box-wrapper">
                            <div className="box">
                                <img src={countyDirector3} alt="County Director 3" />
                                <div className="description">
                                    After losing a close friend to an opioid overdose I was motivated to work to address the problem of overdoses within our community and provide support to those struggling with addiction.
                                </div>
                            </div>
                            <div className="additional-image-container">
                                <h3 className="name">SAIFULLAH KHAN</h3>
                                <div className="position">Chief Financial Officer</div>
                                <div className="position">Hillsborough County Director</div>
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
                        <div className="box-wrapper">
                            <div className="box">
                                <img src={countyDirector1} alt="County Director 1" />
                                <div className="description">
                                    Seeing the widespread impact of overdose death in my community drives me to prevent suffering through education and harm reduction initiatives.
                                </div>
                            </div>
                            <div className="additional-image-container">
                                <h3 className="name">DEVIKA KUMAR</h3>
                                <div className="position">Allegheny County Director</div>
                            </div>
                        </div>
                        <div className="box-wrapper">
                            <div className="box">
                                <img src={countyDirector2} alt="County Director 2" />
                                <div className="description">
                                    Seeing the toll overdoses took on my community and family in Pinellas County motivated me to take action.
                                </div>
                            </div>
                            <div className="additional-image-container">
                                <h3 className="name">NEBIYOU DANIEL</h3>
                                <div className="position">Pinellas County Director</div>
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
                        <div className="box-container">
                            <div className="box-wrapper">
                                    <div className="box">
                                        <img src={board1} alt="Board Member 1" />
                                        <div className="description">
                                            I want to use my technical experience to combat real-world issues and witness meaningful change in my community.
                                        </div>
                                    </div>
                                    <div className="additional-image-container">
                                        <h3 className="name">RAHUL CHARI</h3>
                                        <div className="position">Project Manager</div>
                                    </div>
                                </div>
                            <div className="box-wrapper">
                                <div className="box">
                                    <img src={board2} alt="Board Member 2" />
                                    <div className="description">
                                        I aspire to apply my software development skills to tackle real-world issues related to drug overdose and drive meaningful change in the community.
                                    </div>
                                </div>
                                <div className="additional-image-container">
                                    <h3 className="name">RUTVI SHUKLA</h3>
                                    <div className="position">Software Developer</div>
                                </div>
                            </div>
                            <div className="box-wrapper">
                                <div className="box">
                                    <img src={board3} alt="Board Member 3" />
                                    <div className="description">
                                        Gain real-world experience by applying my technical skills to developing a platform with resources for those who are struggling with or combating.
                                    </div>
                                </div>
                                <div className="additional-image-container">
                                    <h3 className="name">ANTENEH ZEWDIE</h3>
                                    <div className="position">Software Developer</div>
                                </div>
                            </div>
                            <div className="box-wrapper">
                                <div className="box">
                                    <img src={board4} alt="Board Member 4" />
                                    <div className="description">
                                        My goal was to use my technical expertise to create an application that tackles pressing issues in today’s world and benefits society in a meaningful manner.
                                    </div>
                                </div>
                                <div className="additional-image-container">
                                    <h3 className="name">DANIEL D'SOUZA</h3>
                                    <div className="position">Software Developer</div>
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
