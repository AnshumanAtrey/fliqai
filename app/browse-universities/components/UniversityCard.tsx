import Image from 'next/image';

interface University {
    id: string;
    country: 'US' | 'UK';
    name?: string;
    location?: string;
    ranking?: string;
    acceptanceRate?: string;
    description?: string;
    image?: string;
    quote?: string;
    author?: string;
    authorImage?: string;
    authorCourse?: string;
    authorYear?: string;
    chartData?: number[];
    overall_match?: number;
}

interface UniversityCardProps {
    university: University;
    onUniversityClick: (university: University) => void;
}

export function UniversityCard({ university, onUniversityClick }: UniversityCardProps) {
    return (
        <div className="w-full border border-black bg-light-bg dark:bg-dark-secondary relative" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            {/* Mobile Layout */}
            <div className="block sm:hidden p-4">
                {/* Top Section: Left (Info) + Right (Image) */}
                <div className="flex gap-4 mb-4">
                    {/* Left Side - Match percentage, name, location, ranking */}
                    <div className="flex-1">
                        {/* Match Percentage Badge */}
                        <div className="inline-flex py-1 px-3 justify-center items-center gap-2.5 border border-black bg-white mb-3" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                            <span className="text-light-text font-outfit text-sm font-normal leading-normal">
                                {university.overall_match ? `${Math.round(university.overall_match)}% Overall Match` : '72% Overall Match'}
                            </span>
                        </div>

                        {/* University Name - Option 1: Limited to 2 lines with ellipsis */}
                        <h3 className="text-light-text dark:text-dark-text font-outfit text-xl font-bold leading-tight mb-2 line-clamp-2" title={university.name}>
                            {university.name}
                        </h3>

                        {/* Alternative Option 2: Fixed height with hidden scroll (uncomment to use)
            <div className="h-12 mb-2">
              <h3 className="text-light-text dark:text-dark-text font-outfit text-xl font-bold leading-tight text-scroll h-full" title={university.name}>
                {university.name}
              </h3>
            </div>
            */}

                        {/* Location */}
                        <p className="text-light-text dark:text-dark-text font-outfit text-sm font-normal leading-normal mb-1">{university.location}</p>

                        {/* Ranking */}
                        <p className="text-black dark:text-dark-text font-outfit text-sm font-normal leading-normal">{university.ranking}</p>
                    </div>

                    {/* Right Side - University Image */}
                    <div className="w-32 h-auto border border-black bg-light-secondary dark:bg-dark-secondary flex-shrink-0 overflow-hidden">
                        <Image
                            src={university.image || "/college_profile.png"}
                            alt={university.name || "University"}
                            width={128}
                            height={96}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* View University Button */}
                <button
                    onClick={() => onUniversityClick(university)}
                    className="w-full py-3 mb-4 border border-black text-black font-outfit text-base font-medium leading-normal transition-colors duration-200 bg-[#FF9169] hover:bg-[#ff7b4d]"
                    style={{ boxShadow: '4px 4px 0 0 #000' }}
                >
                    View University
                </button>

                {/* Separator Line */}
                <div className="w-full h-px bg-black mb-4"></div>

                {/* Bar Chart - Centered */}
                <div className="flex justify-center items-end mb-4 gap-4">
                    {university.chartData?.map((value, index) => {
                        const colors = ['#32D583', '#F97066', '#FDB022', '#32D583'];
                        const labels = ['Academics', 'Finances', 'Location', 'Culture'];
                        const height = Math.max(20, (value / 100) * 80);
                        return (
                            <div key={index} className="flex flex-col items-center gap-1">
                                <span className="text-center font-outfit font-bold text-xs leading-normal" style={{ color: colors[index] }}>
                                    {value}%
                                </span>
                                <div
                                    className="w-8 border border-black"
                                    style={{
                                        height: `${height}px`,
                                        backgroundColor: colors[index],
                                        boxShadow: '2px 2px 0 0 #000'
                                    }}
                                ></div>
                                <span className="text-center text-light-text dark:text-dark-text font-outfit font-medium text-xs leading-tight">
                                    {labels[index]}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Student Testimonial Section */}
                <div className="border border-black bg-white dark:bg-dark-tertiary p-4" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    {/* Student Quote */}
                    <p className="text-light-text dark:text-dark-text font-outfit text-sm font-normal leading-[140%] mb-3">
                        &ldquo;{university.quote || 'The University of Bath gave me more than a degree. It gave me a community that challenged me, inspired me, and prepared me to make a real impact'}&rdquo;
                    </p>
                    
                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                        {/* Student Profile Image */}
                        <div className="w-10 h-10 rounded-full border border-black overflow-hidden flex-shrink-0">
                            <Image
                                src={university.authorImage || "/student1.png"}
                                alt={university.author || "Student"}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Student Details */}
                        <div className="flex-1">
                            <p className="text-[#FF9169] font-outfit text-sm font-semibold leading-tight">
                                {university.author || "David Kim"}
                            </p>
                            <p className="text-light-text dark:text-dark-text font-outfit text-xs font-normal leading-tight">
                                {university.authorCourse || "BSc Business"}, {university.authorYear || "Class of 2025"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex h-auto lg:h-[395px] p-6 gap-6">
                {/* Left - University Image */}
                <div className="flex-shrink-0 relative">
                    <div className="w-[280px] lg:w-[345px] h-[250px] lg:h-[347px] border border-black bg-light-secondary dark:bg-dark-secondary flex flex-col justify-between">
                        <Image
                            src={university.image || "/college_profile.png"}
                            alt={university.name || "University"}
                            width={345}
                            height={347}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Match Percentage Badge - Inside Image */}
                    <div className="absolute bottom-4 left-4 inline-flex py-2 px-4 justify-center items-center gap-2.5 border border-black bg-white" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                        <span className="text-light-text font-outfit text-sm lg:text-base font-normal leading-normal">
                            {university.overall_match ? `${Math.round(university.overall_match)}% Overall Match` : '72% Overall Match'}
                        </span>
                    </div>
                </div>

                {/* Middle - University Info and Chart */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        {/* University Name - Option 1: Limited to 2 lines with ellipsis */}
                        <h3 className="text-light-text dark:text-dark-text font-outfit text-2xl lg:text-[32px] font-bold leading-normal mb-2 line-clamp-2" title={university.name}>
                            {university.name}
                        </h3>

                        {/* Alternative Option 2: Fixed height with hidden scroll (uncomment to use)
            <div className="h-16 lg:h-20 mb-2">
              <h3 className="text-light-text dark:text-dark-text font-outfit text-2xl lg:text-[32px] font-bold leading-normal text-scroll h-full" title={university.name}>
                {university.name}
              </h3>
            </div>
            */}

                        {/* Location and Ranking */}
                        <p className="text-light-text dark:text-dark-text font-outfit text-lg font-normal leading-[150%] mb-2">{university.location}</p>
                        <p className="text-light-text dark:text-dark-text font-outfit text-lg font-normal leading-[150%] mb-3">{university.ranking}</p>
                    </div>

                    {/* Bar Chart Container - Aligned to bottom */}
                    <div className="flex w-[200px] lg:w-[236px] justify-between items-end self-start">
                        {university.chartData?.map((value, index) => {
                            const colors = ['#32D583', '#F97066', '#FDB022', '#32D583'];
                            const labels = ['Academics', 'Finances', 'Location', 'Culture'];
                            const height = Math.max(30, (value / 100) * 120);
                            return (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    {/* Percentage Label with consistent font */}
                                    <span className="text-center font-outfit font-bold text-sm leading-normal" style={{ color: colors[index] }}>
                                        {value}%
                                    </span>
                                    {/* Bar */}
                                    <div
                                        className="w-10 lg:w-12 border border-black"
                                        style={{
                                            height: `${height}px`,
                                            backgroundColor: colors[index],
                                            boxShadow: '2px 2px 0 0 #000'
                                        }}
                                    ></div>
                                    {/* Category Label */}
                                    <span className="text-center text-light-text dark:text-dark-text font-outfit font-medium text-xs leading-tight">
                                        {labels[index]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right - Student Testimonial Section */}
                <div className="flex flex-col w-[240px] lg:w-[280px]">
                    <div className="inline-flex py-4 px-6 flex-col justify-between border border-black bg-white dark:bg-dark-tertiary flex-1" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                        {/* Student Quote */}
                        <div className="flex-1 mb-4">
                            <p className="text-light-text dark:text-dark-text font-outfit text-sm lg:text-base font-normal leading-[140%] mb-4">
                                &ldquo;{university.quote || 'The University of Bath gave me more than a degree. It gave me a community that challenged me, inspired me, and prepared me to make a real impact'}&rdquo;
                            </p>
                            
                            {/* Student Info */}
                            <div className="flex items-center gap-3">
                                {/* Student Profile Image */}
                                <div className="w-12 h-12 rounded-full border border-black overflow-hidden flex-shrink-0">
                                    <Image
                                        src={university.authorImage || "/student1.png"}
                                        alt={university.author || "Student"}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Student Details */}
                                <div className="flex-1">
                                    <p className="text-[#FF9169] font-outfit text-sm font-semibold leading-tight">
                                        {university.author || "David Kim"}
                                    </p>
                                    <p className="text-light-text dark:text-dark-text font-outfit text-xs font-normal leading-tight">
                                        {university.authorCourse || "BSc Business"}, {university.authorYear || "Class of 2025"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Find out more button */}
                        <div className="mt-auto">
                            <button
                                onClick={() => onUniversityClick(university)}
                                className="w-full py-3 border border-black text-black font-outfit text-sm lg:text-base font-medium leading-normal transition-colors duration-200 bg-[#FF9169] hover:bg-[#ff7b4d]"
                                style={{ boxShadow: '4px 4px 0 0 #000' }}
                            >
                                Find out more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}