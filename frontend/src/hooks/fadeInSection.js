import React, { useEffect, useRef, useState } from 'react';

/* Uses the IntersectionObserver API to fade in a component when it comes into view */

const FadeInSection = ({ children, threshold = 0.1 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(${isVisible ? 0 : 20}px)`,
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;