/**
 * @typedef {Object} DashboardStats
 * @property {number} totalInterviews
 * @property {number} completedInterviews
 * @property {number} averageScore
 * @property {Array} recentInterviews
 */

export const createEmptyDashboard = () => ({
  totalInterviews: 0,
  completedInterviews: 0,
  averageScore: 0,
  recentInterviews: [],
});
