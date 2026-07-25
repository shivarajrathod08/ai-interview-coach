import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { usePagination } from "../../hooks/usePagination";
import { useDebounce } from "../../hooks/useDebounce";
import * as interviewApi from "../../api/interviewApi";
import { PageContainer } from "../../components/layout";
import { InterviewList, InterviewFilterBar } from "../../components/interview";
import { Button, Skeleton, EmptyState, Pagination } from "../../components/common";
import { ROUTES } from "../../constants/routes";

const InterviewListPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(interviewApi.getInterviews, []);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const debouncedSearch = useDebounce(search, 300);

  const filteredInterviews = useMemo(() => {
    const list = Array.isArray(data) ? data : data?.items || [];
    return list.filter((interview) => {
      const matchesSearch =
        !debouncedSearch ||
        interview.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        interview.role?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = status === "ALL" || interview.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data, debouncedSearch, status]);

  const { page, totalPages, paginatedItems, goToPage, nextPage, previousPage } =
    usePagination(filteredInterviews);

  return (
    <PageContainer
      title="Interviews"
      description="All your mock interview sessions in one place."
      actions={<Button onClick={() => navigate(ROUTES.INTERVIEW_NEW)}>New interview</Button>}
    >
      {error && (
        <EmptyState
          title="We couldn't load your interviews"
          description={error.message}
          action={<Button onClick={refetch}>Try again</Button>}
        />
      )}

      {loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      )}

      {!loading && !error && (
        <>
          <InterviewFilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
          />
          <InterviewList interviews={paginatedItems} />
          <div className="mt-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              onNext={nextPage}
              onPrevious={previousPage}
              onGoToPage={goToPage}
            />
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default InterviewListPage;
