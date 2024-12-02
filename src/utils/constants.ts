export const API_URL = "https://car-spare-parts-production.up.railway.app/api/v2.0";

// logout function
export const logout = (e: any) => {
  e.preventDefault();
  localStorage.removeItem("user");
  window.location.href = "/login?logout=true";
};