import React, { useState } from "react";

const EndingSection = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className="ending-container">
            <h1 className="help-heading">HOW YOU CAN HELP</h1>
            <div className="help-text">
                <div className="bulletpoint">
                    <span className="help-highlight">SPREAD THE WORD.</span> 
                    <span>Share Prevent Overdose Inc. with your family, friends, and community to help amplify our impact.</span> 
                </div>
                <div className="bulletpoint">
                    <span className="help-highlight">GET INVOLVED.</span>
                    <span>Dedicate your time and talents to our organization and join the fight against drug overdose. 
                    </span>
                    {/* <span style={{ marginLeft: '7px', color: '#ff5fa8'}}>Contact Us.</span> */}
                </div>     
            </div>
            <div className="closing-button meet-the-team-button" onClick={toggleDropdown}>
                MEET THE TEAM <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
                <div className="dropdown-menu" style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                    <a href="/founders" className="dropdown-item">FOUNDERS</a>
                    <a href="/board" className="dropdown-item">BOARD</a>
                </div>
            </div>
        </div>
    );
};

export default EndingSection;