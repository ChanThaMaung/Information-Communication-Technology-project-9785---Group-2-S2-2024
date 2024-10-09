import PropTypes from 'prop-types'; // Add this import
import { useEffect, useState } from 'react'; // Add this import

const LearnMoreModal = ({ show, handleClose, content, title }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match duration with CSS transition
            return () => clearTimeout(timer);
        }
    }, [show]);

    return (
        <div className={`fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.8)] ${show ? 'block' : 'hidden'}`}> 
            <div className="fixed inset-0" onClick={handleClose}></div>
            <div className={`bg-gradient-to-r max-w-md mx-auto  from-blue-500 to-purple-600 rounded-lg shadow-lg z-50 p-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl font-extrabold mb-4 text-white text-center">{title}</h2>
                <p className="text-white whitespace-pre-wrap">{content}</p>
                <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-200 transition duration-200" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

// Add PropTypes validation
LearnMoreModal.propTypes = {
    show: PropTypes.bool.isRequired, // Validate 'show' as a required boolean
    handleClose: PropTypes.func.isRequired, // Validate 'handleClose' as a required function
    content: PropTypes.string.isRequired, // Validate 'content' as a required string
    title: PropTypes.string.isRequired, // Validate 'title' as a required string
};

export default LearnMoreModal;