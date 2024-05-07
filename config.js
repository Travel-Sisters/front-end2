  const dev = {
        API_URL: "http://localhost:8080/api"
      };
      
  const prod = {
        API_URL: "http://44.208.115.29/api"
      };

  const config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
      };

export default config;