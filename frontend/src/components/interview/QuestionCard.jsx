import { Card, Badge } from "../common";

const QuestionCard = ({ question, index }) => {
  if (!question) {
    return null;
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <Badge variant="progress">
          Question {index + 1}
        </Badge>

        {question.difficulty && (
          <Badge variant="secondary">
            {question.difficulty}
          </Badge>
        )}
      </div>

      <p className="font-display text-lg font-semibold leading-relaxed text-ink-light dark:text-ink-dark">
        {question.questionText}
      </p>
    </Card>
  );
};

export default QuestionCard;