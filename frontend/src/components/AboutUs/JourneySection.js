import React, { useEffect, useRef } from "react";
import sphere from "../../images/purple sphere.png";

const JourneySection = () => {
  const journeyContainerRefs = useRef([]);

  const journeyData = [
    { title: "In The Beginning", date: "August 2022", description: "Samay, Cole, and Saif came together with the shared mission of distributing Narcan to communities around USF and Tampa, founding Prevent Overdose Inc." },
    { title: "We Secured Narcan Distribution Designation", date: "January 2023", description: "After months of paperwork, Prevent Overdose Inc. was officially designated as a Narcan-distributing organization through a funding mechanism from the Florida Department of Children and Families (DCF)." },
    { title: "Our First Distribution Event", date: "February 12, 2023", description: "Samay, Cole, and Saif provided individuals with information on how to recognize and respond to an overdose while distributing Narcan to churchgoers at New Life Church in Tampa, Florida." },
    { title: "We Distributed $50,000 in Narcan and Provided Training", date: "December 2023", description: "At the turn of the new year, Prevent Overdose Inc. distributed over $50,000 worth of Narcan, reversed more than 10 overdoses, and provided over 500 dental hygiene, body hygiene, and wound care kits to churches, homeless shelters, encampments, and recovery clinics. Additionally, the organization facilitated overdose recognition and response training for homeless shelter staff and USF students." },
    { title: "We Expanded Across Multiple Counties", date: "March 2024", description: "Friends outside our community began reaching out to express interest in starting their own chapters of Prevent Overdose Inc. in their respective counties. We quickly expanded to Alachua, Pinellas, Leon, Manatee, Miami-Dade, Citrus, St. Johns, and even Allegheny County in Pittsburgh, Pennsylvania." },
    { title: "We Broadened Efforts to Improve Distribution and Reporting", date: "May 2024", description: "Soon, Prevent Overdose Inc. was managing hundreds of Narcan kits each month across multiple counties while also tracking overdose reversals for our monthly DCF reports. Samay, Cole, and Saif realized that Prevent Overdose Inc. needed more sustainable solutions to address these logistical challenges. As a result, a founding software team was recruited to tackle these issues." },
    { title: "Developing Innovative Technology for Narcan Distribution", date: "September 2024", description: "Our founding team of software engineers developed our website, overdose reporting system, and Narcan request system while also planning our overdose map to visualize all the data. We began to realize that this technology could be beneficial to other Narcan-distributing organizations across the nation." },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // When the observer detects that this element meets the visibility threshold, it adds the "in-view" CSS class to it
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
            });
        },
        // 35% of the element is visible within the viewport
        { threshold: 0.35 } 
    );

    // This allows each referenced element to be tracked for when it enters the viewport
    journeyContainerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Clean up
    return () => {
      journeyContainerRefs.current.forEach((ref) => {
        // Stop the IntersectionObserver from watching it anymore
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div>
        <h1 className="journey-title">OUR JOURNEY</h1>
        <div className="journey-timeline">
            {journeyData.map((item, index) => (
                <div
                    key={index}
                    // Assigns each journey container element to journeyContainerRefs at the specified index
                    ref={(journeyContainer) => (journeyContainerRefs.current[index] = journeyContainer)}
                    className={`journey-container ${index % 2 === 0 ? "left-container" : "right-container"}`}
                >
                <img src={sphere} alt="sphere" />
                <div className="journey-text-box">
                    <h2 style={{ color: "black" }}>{item.title}</h2>
                    <small>{item.date}</small>
                    <p style={{ fontFamily: "nunito sans" }}>{item.description}</p>
                    <span
                        className={`${
                        index % 2 === 0 ? "left-container-arrow" : "right-container-arrow"
                    }`}
                    />
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default JourneySection;