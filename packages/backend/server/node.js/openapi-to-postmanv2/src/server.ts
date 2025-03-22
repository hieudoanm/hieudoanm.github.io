import { startHttpServer } from './server/http';
import { logger } from './utils/log';

const startServer = async () => {
  await startHttpServer();
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🔄 Shutting down Server ...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🔄 Shutting down Server ...');
  process.exit(0);
});

startServer();
