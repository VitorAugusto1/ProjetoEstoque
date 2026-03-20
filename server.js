require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});