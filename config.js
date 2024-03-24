  const dev = {
        API_URL: "http://localhost:8080"
      };
      
  const prod = {
        API_URL: "http://10.0.0.215:8080"
      };

  var config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
  };


export default config;