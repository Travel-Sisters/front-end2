  const dev = {
        API_URL: "http://localhost:8080/api"
      };
      
  const prod = {
        ...(import.meta.env.API_BACK)
      };

  const config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
      };

export default config;