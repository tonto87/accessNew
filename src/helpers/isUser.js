export const isUser = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated;
};
