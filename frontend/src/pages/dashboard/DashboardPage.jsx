import { useFetch } from "../../hooks/useFetch";
import * as dashboardApi from "../../api/dashboardApi";
import { PageContainer } from "../../components/layout";
import {
  WelcomeBanner,
  StatsCard,
  QuickActionPanel,
  PerformanceChart,
  RecentInterviewsList,
} from "../../components/dashboard";
import { Card, Skeleton, EmptyState, Button } from "../../components/common";

const DashboardPage = () => {
  const { data, loading, error, refetch } = useFetch(
    dashboardApi.getDashboard,
    []
  );

  return (
    <PageContainer
      title="Dashboard"
      description="Your interview preparation at a glance."
    >
      <div className="flex flex-col gap-6">
        <WelcomeBanner />

        {error && (
          <EmptyState
            title="We couldn't load your dashboard"
            description={error.message}
            action={<Button onClick={refetch}>Try Again</Button>}
          />
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatsCard
                label="Total Interviews"
                value={data.totalInterviews ?? 0}
              />

              <StatsCard
                label="Completed"
                value={data.completedInterviews ?? 0}
              />

              <StatsCard
                label="Average Score"
                value={`${Math.round(data.averageScore ?? 0)}%`}
                hint="Across completed interviews"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="flex flex-col gap-6 lg:col-span-2">
                <Card>
                  <h3 className="mb-4 font-display text-base font-semibold text-ink-light dark:text-ink-dark">
                    Score Trend
                  </h3>

                  <PerformanceChart
                    scores={(data.scoreTrend || []).map((item) => ({
                      label: item.jobRole,
                      score: item.score,
                    }))}
                  />
                </Card>

                <div>
                  <h3 className="mb-4 font-display text-base font-semibold text-ink-light dark:text-ink-dark">
                    Recent Interviews
                  </h3>

                  <RecentInterviewsList
                    interviews={data.scoreTrend || []}
                  />
                </div>
              </div>

              <QuickActionPanel />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default DashboardPage;