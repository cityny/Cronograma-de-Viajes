import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll positioning
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 rounded-full bg-indigo-600 text-white shadow-2xl hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all duration-300 animate-fade-in-up focus:outline-none focus:ring-4 focus:ring-indigo-300 group"
                    aria-label="Subir arriba"
                >
                    <ArrowUpIcon className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
