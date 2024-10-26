import React from "react";

const EndingSection = () => {
    return (
        <div className="closing-buttons">
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
            <a href="/board" className="closing-button meet-the-team-button">
                MEET THE TEAM
            </a>
        </div>
    );
};

export default EndingSection;