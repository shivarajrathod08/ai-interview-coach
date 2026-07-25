import { Select, Input } from "../common";
import { INTERVIEW_STATUS } from "../../constants/appConstants";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All statuses" },
  { value: INTERVIEW_STATUS.PENDING, label: "Pending" },
  { value: INTERVIEW_STATUS.IN_PROGRESS, label: "In progress" },
  { value: INTERVIEW_STATUS.COMPLETED, label: "Completed" },
];

const InterviewFilterBar = ({ search, onSearchChange, status, onStatusChange }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Input
          name="search"
          placeholder="Search interviews by title or role"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="sm:w-56">
        <Select
          name="status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default InterviewFilterBar;
