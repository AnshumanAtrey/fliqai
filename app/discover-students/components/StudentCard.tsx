import Image from 'next/image';

interface Student {
  id: number;
  name: string;
  university?: string;
  graduationYear?: string;
  stats: string;
  description: string;
  background: string;
  interests: string;
  sat: string;
  gpa: string;
  uwGpa: string;
  profileImage: string;
  colleges: string[];
  sticker?: string;
  hasSticker: boolean;
}

interface StudentCardProps {
  student: Student;
  onStudentClick: (student: Student) => void;
}

export function StudentCard({ student, onStudentClick }: StudentCardProps) {
  return (
    <div className="w-full border border-black bg-light-bg dark:bg-dark-secondary relative" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      {/* Mobile Layout */}
      <div className="block sm:hidden p-4">
        {/* Top Section: Profile Image + Name and Stats */}
        <div className="flex gap-4 mb-4">
          {/* Left Side - Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 border border-black bg-light-secondary dark:bg-dark-secondary rounded-full overflow-hidden">
              <Image
                src={student.profileImage || "/profile.png"}
                alt={student.name}
                width={80}
                height={80}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side - Student Info */}
          <div className="flex-1">
            {/* Student Name */}
            <h3 className="text-light-text dark:text-dark-text font-outfit text-xl font-bold leading-tight mb-1 line-clamp-2" title={student.name}>
              {student.name}
            </h3>
            
            {/* University and Year */}
            {student.university && (
              <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-2">
                {student.university} {student.graduationYear && `'${student.graduationYear.slice(-2)}`}
              </p>
            )}
            
            {/* Stats */}
            <p className="text-light-text dark:text-dark-text font-outfit text-xs font-normal leading-normal mb-2">
              {student.stats}
            </p>
          </div>
        </div>

        {/* View Profile Button */}
        <button
          onClick={() => onStudentClick(student)}
          className="w-full py-3 mb-4 border border-black text-black font-outfit text-base font-medium leading-normal transition-colors duration-200 bg-[#FF9169] hover:bg-[#ff7b4d]"
          style={{ boxShadow: '4px 4px 0 0 #000' }}
        >
          View {student.name.split(' ')[0]}&apos;s Profile
        </button>

        {/* Separator Line */}
        <div className="w-full h-px bg-black mb-4"></div>

        {/* Description */}
        <p className="text-light-text dark:text-dark-text font-outfit text-sm font-normal leading-[150%] mb-4">
          {student.description}
        </p>

        {/* Background Info */}
        <div className="mb-4">

          <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-1">
            Academic Interests: <span className="font-normal">{student.interests}</span>
          </p>
          <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-1">
            SAT: <span className="font-normal">{student.sat}</span>
          </p>
          <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-1">
            GPA (W): <span className="font-normal">{student.gpa}</span>
          </p>
          <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-1">
            GPA (UW): <span className="font-normal">{student.uwGpa}</span>
          </p>
        </div>

        {/* Accepted Universities - Removed to prevent 404 errors */}
        {/* <div>
          <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-2">Accepted to</p>
          <div className="flex items-center gap-3 flex-wrap">
            {student.colleges.slice(0, 4).map((college, index) => (
              <Image
                key={index}
                src={college}
                alt={`College ${index + 1}`}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            ))}
            {student.colleges.length > 4 && (
              <span className="text-light-text dark:text-dark-text font-outfit text-sm font-medium">
                +{student.colleges.length - 4} more
              </span>
            )}
          </div>
        </div> */}
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block p-6">
        {/* First DIV: Profile Image + Name/Stats + View Profile Button */}
        <div className="flex items-start justify-between mb-6">
          {/* Left Side: Profile Image + Name/Stats */}
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0 relative">
              <div className="w-16 h-16 lg:w-20 lg:h-20 border border-black bg-light-secondary dark:bg-dark-secondary rounded-full overflow-hidden">
                <Image
                  src={student.profileImage || "/profile.png"}
                  alt={student.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Sticker if available */}
              {student.hasSticker && student.sticker && (
                <div className="absolute -top-1 -right-1">
                  <Image
                    src={student.sticker}
                    alt="Achievement sticker"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
              )}
            </div>

            {/* Name and Stats */}
            <div className="flex-1">
              {/* Student Name */}
              <h3 className="text-light-text dark:text-dark-text font-outfit text-xl lg:text-2xl font-bold leading-tight mb-1" title={student.name}>
                {student.name}
              </h3>
              
              {/* University and Year */}
              {student.university && (
                <p className="text-light-text dark:text-dark-text font-outfit text-base lg:text-lg font-bold mb-2">
                  {student.university} {student.graduationYear && `'${student.graduationYear.slice(-2)}`}
                </p>
              )}
              
              {/* Stats */}
              <p className="text-light-text dark:text-dark-text font-outfit text-sm lg:text-base font-normal leading-normal">
                {student.stats}
              </p>
            </div>
          </div>

          {/* Right Side: View Profile Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onStudentClick(student)}
              className="px-6 py-3 border border-black text-black font-outfit text-sm lg:text-base font-medium leading-normal transition-colors duration-200 bg-[#FF9169] hover:bg-[#ff7b4d]"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              View {student.name.split(' ')[0]}&apos;s Profile
            </button>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-black mb-6"></div>

        {/* Second DIV: Description + Background Info */}
        <div className="flex gap-8">
          {/* Left Side: Description + Accepted To */}
          <div className="flex-1">
            {/* Description */}
            <p className="text-light-text dark:text-dark-text font-outfit text-sm lg:text-base font-normal leading-[150%] mb-6">
              {student.description}
            </p>

            {/* Accepted Universities */}
            {/* <div>
              <p className="text-light-text dark:text-dark-text font-outfit text-sm font-bold mb-3">Accepted to</p>
              <div className="flex items-center gap-4">
                {student.colleges.slice(0, 4).map((college, index) => (
                  <Image
                    key={index}
                    src={college}
                    alt={`College ${index + 1}`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                ))}
                {student.colleges.length > 4 && (
                  <span className="text-light-text dark:text-dark-text font-outfit text-sm font-medium">
                    +{student.colleges.length - 4} more
                  </span>
                )}
              </div>
            </div> */}
          </div>

          {/* Right Side: Background + Academic Info + Test Scores */}
          <div className="flex-shrink-0 w-80">
            <div className="space-y-2">

              <p className="text-light-text dark:text-dark-text font-outfit text-sm">
                <span className="font-bold">Academic Interests:</span> {student.interests}
              </p>
              <p className="text-light-text dark:text-dark-text font-outfit text-sm">
                <span className="font-bold">SAT:</span> {student.sat}
              </p>
              <p className="text-light-text dark:text-dark-text font-outfit text-sm">
                <span className="font-bold">GPA (W):</span> {student.gpa}
              </p>
              <p className="text-light-text dark:text-dark-text font-outfit text-sm">
                <span className="font-bold">GPA (UW):</span> {student.uwGpa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}