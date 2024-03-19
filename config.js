  const dev = {
        API_URL: "http://localhost:8080"
      };
      
  const prod = {
        API_URL: "http://10.0.0.230:3000"
      };

  var config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
  };


export default config;