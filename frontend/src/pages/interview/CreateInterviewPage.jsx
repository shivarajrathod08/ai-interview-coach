import { PageContainer, BreadcrumbBar } from "../../components/layout";
import { Card } from "../../components/common";
import { InterviewCreateForm } from "../../components/interview";
import { ROUTES } from "../../constants/routes";

const CreateInterviewPage = () => {
  return (
    <PageContainer title="New interview" description="Tell us what you're preparing for.">
      <BreadcrumbBar
        items={[
          { label: "Interviews", to: ROUTES.INTERVIEWS },
          { label: "New interview" },
        ]}
      />
      <div className="mx-auto max-w-xl">
        <Card>
          <InterviewCreateForm />
        </Card>
      </div>
    </PageContainer>
  );
};

export default CreateInterviewPage;
