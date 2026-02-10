import React, { useState, useRef, useEffect } from 'react';
import { InfoIcon } from './Icons';

interface InfoTooltipProps {
    text: string;
    example?: string;
    position?: 'center' | 'left' | 'right'; // Backward compatibility, but auto override preferred
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, example }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isVisible && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const tooltipWidth = 224; // w-56 = 14rem = 224px
            const windowWidth = window.innerWidth;

            // Check right edge
            if (rect.left + (tooltipWidth / 2) > windowWidth - 20) {
                setAlignment('right');
            }
            // Check left edge
            else if (rect.left - (tooltipWidth / 2) < 20) {
                setAlignment('left');
            }
            // Default center
            else {
                setAlignment('center');
            }
        }
    }, [isVisible]);

    // Determine classes based on alignment
    let containerClasses = "absolute z-50 bottom-full mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl animate-fade-in-up transition-all duration-200";
    let arrowClasses = "absolute top-100 -mt-1 border-[6px] border-transparent border-t-gray-900";

    if (alignment === 'center') {
        containerClasses += " left-1/2 transform -translate-x-1/2";
        arrowClasses += " left-1/2 transform -translate-x-1/2";
    } else if (alignment === 'right') {
        containerClasses += " right-0 mr-[-6px]";
        arrowClasses += " right-2";
    } else if (alignment === 'left') {
        containerClasses += " left-0 ml-[-6px]";
        arrowClasses += " left-2";
    }

    return (
        <div
            className="relative inline-flex items-center ml-2"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={(e) => {
                e.preventDefault();
                setIsVisible(!isVisible);
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                className="text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none"
                aria-label="Más información"
            >
                <InfoIcon className="w-4 h-4" />
            </button>

            {isVisible && (
                <div className={containerClasses}>
                    <div className="font-medium mb-1 text-gray-200">
                        {text}
                    </div>
                    {example && (
                        <div className="text-gray-400 italic border-t border-gray-700 pt-1 mt-1">
                            Ej: {example}
                        </div>
                    )}
                    <div className={arrowClasses}></div>
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;
