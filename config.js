  const dev = {
        API_URL: "http://localhost:8080/api"
      };
      
  const prod = {
        API_URL: "http://10.0.0.185:8080/api"
      };

  const config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
      };

export default config;