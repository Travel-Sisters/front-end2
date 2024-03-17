const config = {
    development: {
      API_URL: 'http://localhost:8080', // Endereço do backend para ambiente de desenvolvimento
    },
    production: {
      API_URL: 'http://10.0.0.230:porta', // Endereço do backend para ambiente de produção
    },
  };
  
  const environment = process.env.NODE_ENV || 'development'; // Define o ambiente de execução como desenvolvimento por padrão
  
  export default config[environment];