interface ResultsHeaderProps {
  loading: boolean;
  error: string | null;
  studentsCount: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function ResultsHeader({
  loading,
  error,
  studentsCount,
  currentPage,
  totalPages,
  setCurrentPage
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 w-full gap-4">
      <div className="flex items-center">
        {loading && (
          <span className="text-light-text dark:text-dark-text font-outfit text-sm sm:text-base">Loading students...</span>
        )}
        {error && (
          <span className="text-red-500 font-outfit text-sm sm:text-base">{error}</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <span className="text-light-text dark:text-dark-text font-outfit text-sm sm:text-base font-medium">
          {!loading && !error && `Showing ${studentsCount} Students - Page ${currentPage} of ${totalPages}`}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`}
            style={{ boxShadow: '2px 2px 0 0 #000', width: '32px', height: '32px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-4 h-4 stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`}
            style={{ boxShadow: '2px 2px 0 0 #000', width: '32px', height: '32px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-4 h-4 stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}