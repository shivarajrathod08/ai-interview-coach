import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import * as interviewApi from "../../api/interviewApi";
import { PageContainer, BreadcrumbBar } from "../../components/layout";
import { InterviewSummaryPanel } from "../../components/interview";
import { Skeleton, EmptyState, Button } from "../../components/common";
import { ROUTES } from "../../constants/routes";

const InterviewSummaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: summary,
    loading,
    error,
    refetch,
  } = useFetch(() => interviewApi.getInterviewSummary(id), [id]);

  return (
    <PageContainer
      title="Interview summary"
      description="Here's how you did, and where to focus next."
      actions={
        <Button variant="secondary" onClick={() => navigate(ROUTES.INTERVIEWS)}>
          Back to interviews
        </Button>
      }
    >
      <BreadcrumbBar
        items={[
          { label: "Interviews", to: ROUTES.INTERVIEWS },
          { label: "Summary" },
        ]}
      />

      {loading && (
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-40" />
        </div>
      )}

      {error && !loading && (
        <EmptyState
          title="We couldn't load your summary"
          description={error.message}
          action={<Button onClick={refetch}>Try again</Button>}
        />
      )}

      {!loading && !error && summary && (
        <div className="mx-auto max-w-3xl">
          <InterviewSummaryPanel summary={summary} />
        </div>
      )}
    </PageContainer>
  );
};

export default InterviewSummaryPage;
