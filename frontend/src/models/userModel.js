/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [role]
 */

export const createEmptyUser = () => ({
  id: "",
  name: "",
  email: "",
  role: "USER",
});
