import Button from "./Button";

const Pagination = ({ page, totalPages, onNext, onPrevious, onGoToPage }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" size="sm" onClick={onPrevious} disabled={page === 1}>
        Previous
      </Button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onGoToPage(number)}
          className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
            number === page
              ? "bg-primary-500 text-white"
              : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {number}
        </button>
      ))}
      <Button variant="ghost" size="sm" onClick={onNext} disabled={page === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
