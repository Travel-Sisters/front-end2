  const dev = {
        API_URL: "http://localhost:8080/api",
        API_PIX: "http://localhost:3001/pix"
      };
      
  const prod = {
        API_URL: "http://44.208.115.29/api",
        API_PIX: "http://44.208.115.29/pix"
      };

  const config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
      };

export default config;