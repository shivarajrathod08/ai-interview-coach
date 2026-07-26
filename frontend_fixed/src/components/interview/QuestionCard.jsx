import { Card, Badge } from "../common";

const QuestionCard = ({ question, index }) => {
  return (
    <Card>
      <Badge variant="progress" className="mb-3">
        Question {index + 1}
      </Badge>
      <p className="font-display text-lg font-semibold leading-relaxed text-ink-light dark:text-ink-dark">
        {question.questionText}
      </p>
    </Card>
  );
};

export default QuestionCard;
