  const dev = {
        API_URL: (import.meta.env.VITE_API_BACK)
      };
      
  const prod = {
        API_URL: (import.meta.env.prod.VITE_API_BACK)
      };

  const config = {
        ...(import.meta.env.VITE_ENV === "prod" ? prod : dev)
      };

export default config;