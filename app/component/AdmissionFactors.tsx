import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AdmissionFactors = () => {
    const [showAllFactors, setShowAllFactors] = useState(false);

    const getBarWidth = (level: string) => {
        switch (level) {
            case 'Very Important': return '100%';
            case 'Important': return '75%';
            case 'Considered': return '50%';
            case 'Not Considered': return '25%';
            default: return '50%';
        }
    };

    const getBarColor = (level: string) => {
        switch (level) {
            case 'Very Important': return '#FFAFA3';
            case 'Important': return '#FFB255';
            case 'Considered': return '#FFD966';
            case 'Not Considered': return '#85E0A3';
            default: return '#D1D5DB';
        }
    };

    const factors = [
        { name: "Rigor Of Secondary School Record", level: "Very Important" },
        { name: "Academic GPA", level: "Very Important" },
        { name: "Standardized Tests", level: "Considered" },
        { name: "Class Rank", level: "Important" },
        { name: "Recommendations", level: "Not Considered" },
        { name: "Essay", level: "Considered" },
        { name: "Interview", level: "Considered" },
        { name: "Level Of Applicant's Interest", level: "Very Important" },
        { name: "Extracurricular Activity", level: "Important" }
    ].map(factor => ({
        ...factor,
        color: getBarColor(factor.level),
        width: getBarWidth(factor.level)
    }));

    return (
        <div className="w-[90%] mx-auto py-20 border-b-[1px] border-light-text dark:border-dark-text">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text text-[32px] mb-10 mt-4">What Matters For Admission</h2>

            <div className="border-[1px] bg-light-bg dark:bg-dark-tertiary border-black p-6">
                <div className="space-y-6">
                    {factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-6">
                            {/* Factor Name - Left Column */}
                            <div className="w-1/3 text-light-p dark:text-dark-text text-[18px] font-medium">
                                {factor.name}
                            </div>

                            {/* Bar Graph - Middle Column */}
                            <div className="relative flex flex-row gap-6 items-center" style={{ width: '50%', minWidth: '250px' }}>
                                <div
                                    className="h-[50px] border-[1px] border-black overflow-hidden bg-light-bg dark:bg-dark-tertiary"
                                    style={{
                                        width: factor.width,
                                        boxShadow: '2px 2px 0 0 #000',
                                        backgroundColor: factor.color,
                                        minWidth: '30px' // Ensure very small bars are still visible
                                    }}
                                ></div>
                                {/* Importance Level - Right Column */}
                                <div className="w-1/4 text-light-text dark:text-dark-text font-bold text-sm">
                                    {factor.level}
                                </div>
                            </div>


                        </div>
                    ))}
                </div>

                {/* Show All Factors Button */}
                <div className="mt-6">
                    <button
                        onClick={() => setShowAllFactors(!showAllFactors)}
                        className="flex items-center gap-2 bg-[#FF9169] text-black px-4 py-2 border-2 border-black font-medium hover:bg-black hover:text-[#FF9169] transition-colors"
                    >
                        <ChevronDown className="w-4 h-4" />
                        Show all factors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdmissionFactors;