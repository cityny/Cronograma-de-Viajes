import React, { useState } from 'react';
import { InfoIcon } from './Icons';

interface InfoTooltipProps {
    text: string;
    example?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, example }) => {
    const [isVisible, setIsVisible] = useState(false);

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
                type="button"
                className="text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none"
                aria-label="Más información"
            >
                <InfoIcon className="w-4 h-4" />
            </button>

            {isVisible && (
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl animate-fade-in-up">
                    <div className="font-medium mb-1 text-gray-200">
                        {text}
                    </div>
                    {example && (
                        <div className="text-gray-400 italic border-t border-gray-700 pt-1 mt-1">
                            Ej: {example}
                        </div>
                    )}
                    <div className="absolute top-100 left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-[6px] border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;
