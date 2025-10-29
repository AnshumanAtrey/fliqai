import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AdmissionFactor {
  Factor: string;
  'Very Important': string;
  Important: string;
  Considered: string;
  'Not Considered': string;
}

interface AdmissionsData {
  selectionofstudents?: {
    table?: AdmissionFactor[];
  };
}

interface AdmissionFactorsProps {
  admissionsData?: AdmissionsData;
}

const AdmissionFactors: React.FC<AdmissionFactorsProps> = ({ admissionsData }) => {
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

    // Helper function to determine the importance level from database data
    const getImportanceLevel = (factor: AdmissionFactor): string => {
        if (factor['Very Important'] === 'X') return 'Very Important';
        if (factor.Important === 'X') return 'Important';
        if (factor.Considered === 'X') return 'Considered';
        if (factor['Not Considered'] === 'X') return 'Not Considered';
        return 'Not Specified';
    };

    // Get factors from database or use fallback data
    const rawFactors = admissionsData?.selectionofstudents?.table || [
        { Factor: "Rigor Of Secondary School Record", "Very Important": "X", Important: "", Considered: "", "Not Considered": "" },
        { Factor: "Academic GPA", "Very Important": "X", Important: "", Considered: "", "Not Considered": "" },
        { Factor: "Standardized Tests", "Very Important": "", Important: "", Considered: "X", "Not Considered": "" },
        { Factor: "Class Rank", "Very Important": "", Important: "X", Considered: "", "Not Considered": "" },
        { Factor: "Recommendations", "Very Important": "", Important: "", Considered: "", "Not Considered": "X" },
        { Factor: "Essay", "Very Important": "", Important: "", Considered: "X", "Not Considered": "" },
        { Factor: "Interview", "Very Important": "", Important: "", Considered: "X", "Not Considered": "" },
        { Factor: "Level Of Applicant's Interest", "Very Important": "X", Important: "", Considered: "", "Not Considered": "" },
        { Factor: "Extracurricular Activities", "Very Important": "", Important: "X", Considered: "", "Not Considered": "" }
    ];

    // Process factors for display
    const factors = rawFactors.map(factor => {
        const level = getImportanceLevel(factor);
        return {
            name: factor.Factor,
            level: level,
            color: getBarColor(level),
            width: getBarWidth(level)
        };
    });

    // Show only top factors initially, all when expanded
    const displayedFactors = showAllFactors ? factors : factors.slice(0, 9);

    return (
        <div className="w-full px-4 sm:w-[90%] mx-auto py-10 sm:py-20 border-b-[1px] border-light-text dark:border-dark-text">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-light-text dark:text-dark-text mb-6 sm:mb-10 mt-4">What Matters For Admission</h2>

            <div className="border-[1px] bg-light-bg dark:bg-dark-tertiary border-black p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                    {displayedFactors.map((factor, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            {/* Factor Name */}
                            <div className="sm:w-1/3 text-light-p dark:text-dark-text text-sm sm:text-base lg:text-[18px] font-medium">
                                {factor.name}
                            </div>

                            {/* Bar Graph and Level */}
                            <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
                                <div
                                    className="h-[40px] sm:h-[50px] border-[1px] border-black overflow-hidden bg-light-bg dark:bg-dark-tertiary"
                                    style={{
                                        width: factor.width,
                                        boxShadow: '2px 2px 0 0 #000',
                                        backgroundColor: factor.color,
                                        minWidth: '30px',
                                        maxWidth: '100%'
                                    }}
                                ></div>
                                {/* Importance Level */}
                                <div className="text-light-text dark:text-dark-text font-bold text-xs sm:text-sm whitespace-nowrap">
                                    {factor.level}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show All Factors Button - only show if there are more factors */}
                {factors.length > 9 && (
                    <div className="mt-6">
                        <button
                            onClick={() => setShowAllFactors(!showAllFactors)}
                            className="flex items-center gap-2 bg-[#FF9169] text-black px-4 py-2 border-2 border-black font-medium hover:bg-black hover:text-[#FF9169] transition-colors"
                            style={{ boxShadow: '2px 2px 0 0 #000' }}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${showAllFactors ? 'rotate-180' : ''}`} />
                            {showAllFactors ? 'Show fewer factors' : 'Show all factors'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdmissionFactors;