import React, { useState, useEffect } from "react";
import "./Board.css"; 

import founder1 from '../images/Cole Olson New Headshot.jpg';
import founder2 from '../images/Samay_Shah_New_Headshot.jpg';
import founder3 from '../images/Khanheadshot.png';

import countyDirector1 from '../images/Devika Kumar Headshot .jpg';
import countyDirector2 from '../images/Nebiyou Daniel Headshot.jpg';

import board1 from '../images/Rahul Chari Headshot (1).jpg';
import board2 from '../images/Rutvi Shukla Headshot.png';
import board3 from '../images/Anteneh Zewdie Headshot.jpg';
import board4 from '../images/DanielDsouza Headshot.png';

import intern1 from '../images/Khushi_Chitalia_Headshot.jpeg';

import "./Board.css";

const BoardPage = () => {
  useEffect(() => {
    document.title = "Board | Prevent Overdose Inc.";
  }, []);

  const teamData = [
    {
      section: "EXECUTIVE",
      members: [
        { name: "COLE OLSON", role: "Co-Executive Director", image: founder1, description: "My experience of losing both friends and family members due to drug use fueled my desire for change and inspired me to found this organization." },
        { name: "SAMAY SHAH", role: "Co-Executive Director", image: founder2, description: "Seeing people fight addiction while volunteering at my local harm reduction clinic inspired me to do everything I can to make the fight easier." },
        { name: "SAIF KHAN", role: "Chief Financial Officer", image: founder3, description: "After losing a close friend to an opioid overdose I was motivated to work to address the problem of overdoses within our community and provide support to those struggling with addiction." },
      ],
    },
    {
      section: "COUNTY DIRECTORS",
      members: [
        { name: "DEVIKA KUMAR", role: "Allegheny County Director", image: countyDirector1, description: "Seeing the widespread impact of overdose death in my community drives me to prevent suffering through education and harm reduction initiatives." },
        { name: "NEBIYOU DANIEL", role: "Pinellas County Director", image: countyDirector2, description: "Seeing the toll overdoses took on my community and family in Pinellas County motivated me to take action." },
      ],
    },
    {
      section: "SOFTWARE DEVELOPMENT TEAM",
      members: [
        { name: "RAHUL CHARI", role: "Project Manager", image: board1, description: "I want to use my technical experience to combat real-world issues and witness meaningful change in my community." },
        { name: "ANTENEH ZEWDIE", role: "Software Developer", image: board3, description: "Gain real-world experience by applying my technical skills to developing a platform with resources for those who are struggling with or combating addiction." },
        { name: "DANIEL D'SOUZA", role: "Software Developer", image: board4, description: "My goal was to use my technical expertise to create an application that tackles pressing issues in today’s world and benefits society in a meaningful manner." },
        { name: "KHUSHI CHITALIA", role: "Software Development Intern", image: intern1, description: "" },
        { name: "NITISH GOEL", role: "Software Development Intern", image: "", description: "" },
        { name: "EMILY JIJI", role: "Software Development Intern", image: "", description: "" },
        { name: "DEVNAND KUMAR", role: "Software Development Intern", image: "", description: "" },
        { name: "ANANYA MUNDRATHI", role: "Software Development Intern", image: "", description: "" },
        { name: "SNOW PHAM", role: "Software Development Intern", image: "", description: "" },
        { name: "AKHIL WALIA", role: "Software Development Intern", image: "", description: "" },
      ],
    },
  ];

  return (
    <div className="board-container">
      <h1 className="board-heading">MEET THE TEAM</h1>

      {teamData.map((section, idx) => (
        <div key={idx} className="team-section">
          <h2 className="team-heading">{section.section}</h2>
          <div className="box-container">
            {section.members.map((member, idx) => (
              <div key={idx} className="box-wrapper">
                <div className="box">
                  <img src={member.image} alt={`${member.name}'s photo`} />
                    <div className="description">
                        {member.description}
                    </div>
                </div>
                <div className="additional-image-container">
                  <h3 className="name">{member.name}</h3>
                  <p className="position">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

        <div className="team-section">
          <h2 className="team-heading">Past Contributors</h2>
          <p className="past-contributors">Acknowledging the contributions of all members who played a role in shaping Prevent Overdose Inc.</p>
          <p className="name-columns">
            <div className="past-contributors">
              <p>Name 1</p>
              <p>Name 2</p>
              <p>Name 3</p>
            </div>

            <div className="past-contributors">
              <p>Name 4</p>
              <p>Name 5</p>
              <p>Name 6</p>
            </div>
          </p>
        </div>
    </div>
  );
};

export default BoardPage;
