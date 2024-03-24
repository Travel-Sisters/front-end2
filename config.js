  const dev = {
        API_URL: "http://localhost:8080"
      };
      
  const prod = {
        API_URL: "/api"
      };

  var config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
  };


export default config;