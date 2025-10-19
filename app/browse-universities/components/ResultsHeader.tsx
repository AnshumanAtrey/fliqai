import { ArrowLeftIcon } from '../assets/ArrowLeftIcon';
import { ArrowRightIcon } from '../assets/ArrowRightIcon';

interface ResultsHeaderProps {
  loading: boolean;
  error: string | null;
  universitiesCount: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function ResultsHeader({
  loading,
  error,
  universitiesCount,
  currentPage,
  totalPages,
  setCurrentPage
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 w-full gap-4">
      <div className="flex items-center">
        {loading && (
          <span className="text-light-text dark:text-dark-text font-outfit text-sm sm:text-base">Loading universities...</span>
        )}
        {error && (
          <span className="text-red-500 font-outfit text-sm sm:text-base">{error}</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <span className="text-light-text dark:text-dark-text font-outfit text-sm sm:text-base font-medium">
          {!loading && !error && `Showing ${universitiesCount} Universities - Page ${currentPage} of ${totalPages}`}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`}
            style={{ boxShadow: '2px 2px 0 0 #000', width: '32px', height: '32px' }}
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`}
            style={{ boxShadow: '2px 2px 0 0 #000', width: '32px', height: '32px' }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}