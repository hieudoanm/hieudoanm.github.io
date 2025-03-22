import { consumer, startConsumerServer } from './server/consumer';
import { producer, startProducerServer } from './server/producer';
import { logger } from './utils/log';

const startServer = async () => {
  startProducerServer();
  await startConsumerServer();
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🔄 Shutting down Kafka consumer...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🔄 Shutting down Kafka consumer...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});

startServer();
