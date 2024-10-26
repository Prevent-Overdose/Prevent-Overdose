import { lazy, Suspense } from "react";
import "./AboutUs.css"; // Import the CSS file
import StorySection from "../components/AboutUs/StorySection";
import FadeInSection from "../hooks/fadeInSection";

const QuoteSection = lazy(() => import("../components/AboutUs/QuoteSection"));
const JourneySection = lazy(() => import("../components/AboutUs/JourneySection"));
const VisionSection = lazy(() => import("../components/AboutUs/VisionSection"));
const EndingSection = lazy(() => import("../components/AboutUs/EndingSection"));

const AboutUs = () => {
    return (
        <div className="AboutUs-page">
            <StorySection />
            <Suspense fallback={<div>Loading...</div>}>
                <FadeInSection>
                    <QuoteSection />
                </FadeInSection>
                <FadeInSection>
                    <JourneySection />
                </FadeInSection>
                <FadeInSection>
                    <VisionSection />
                </FadeInSection>
                <EndingSection>
                    <EndingSection />
                </EndingSection>
            </Suspense>            
        </div>
    );
};

export default AboutUs;
