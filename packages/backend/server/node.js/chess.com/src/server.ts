import { consumer, producer } from './clients/kafka.client';
import { startKafkaServer } from './server/kafka';
import { startHttpServer } from './server/http';
import { logger } from './utils/log';

const startServer = async () => {
  await startHttpServer();
  await startKafkaServer();
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🔄 Shutting down Kafka Sever...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🔄 Shutting down Kafka Sever...');
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});

startServer();
