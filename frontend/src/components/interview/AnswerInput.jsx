import { TextArea, Button } from "../common";

const AnswerInput = ({
  value,
  onChange,
  onSubmit,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  isSubmitting,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <TextArea
        label="Your answer"
        name="answer"
        placeholder="Type your response as you'd say it out loud..."
        rows={8}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={onPrevious} disabled={isFirst || isSubmitting}>
          Previous
        </Button>
        <div className="flex gap-3">
          <Button
            onClick={onSubmit}
            isLoading={isSubmitting}
            disabled={!value || value.trim().length === 0}
          >
            {isLast ? "Submit & finish" : "Submit & continue"}
          </Button>
          {!isLast && (
            <Button variant="secondary" onClick={onNext} disabled={isSubmitting}>
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
