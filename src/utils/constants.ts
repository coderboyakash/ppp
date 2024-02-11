export const { VITE_API_URL: apiBaseUrl } = import.meta.env;

export const errors = {
  FETCH_ERROR: "Sorry currently we are not able to fetch the request",
  PARSING_ERROR: "Sorry currently we are not able to parse the request",
  TIMEOUT_ERROR: "Request timed out!",
  CUSTOM_ERROR: "Something went wrong",
};


export const colors = {
  dark: "#141D43",
  light: "#ffffff",
  primary: "#6C3B1C",
  secondary: "#6C3B1CE0",
  gray: "#6c757d",
  error: "#e53e3e"
}