/**
 * @typedef {Object} InterviewQuestion
 * @property {string} id
 * @property {string} text
 * @property {string} [answer]
 */

/**
 * @typedef {Object} Interview
 * @property {string} id
 * @property {string} title
 * @property {string} role
 * @property {string} status
 * @property {string} createdAt
 * @property {InterviewQuestion[]} questions
 * @property {Object} [summary]
 */

export const createEmptyInterview = () => ({
  id: "",
  title: "",
  role: "",
  status: "PENDING",
  createdAt: "",
  questions: [],
  summary: null,
});
