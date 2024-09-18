import { useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

export const CountUp = ({ end }) => { // Destructure end from props
    const [count, setCount] = useState(0);
    const duration = 2000; // Duration in milliseconds
    const frameDuration = 1000 / 60; // Frame duration for 60 FPS
    const totalFrames = Math.round(duration / frameDuration);

    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = Math.min(frame / totalFrames, 1);
            setCount(Math.round(end * progress).toFixed(2)); // Use end prop

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
        
        return () => clearInterval(counter); // Cleanup on unmount
    }, [end]); // Update dependency to end

    return <span>{count} $</span>; // Display the count
};

CountUp.propTypes = { // Define prop types
    end: PropTypes.number.isRequired, // Validate end as a required number
};