// utils/auth.js
export const getToken = () => sessionStorage.getItem("JWTtoken");

export const checkAuth = () => {
  const token = getToken();
  return !!token;
};
