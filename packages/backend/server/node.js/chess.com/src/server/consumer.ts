import { kafka } from '../clients/kafka';
import { TOPIC } from '../constants/constants';
import { addPlayer } from '../services/chess.service';
import { logger } from '../utils/log';

export const consumer = kafka.consumer({ groupId: 'chess-group' });

export const startConsumerServer = async () => {
  try {
    await consumer.connect();
    logger.info('✅ Kafka Consumer Connected');

    await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value?.toString() ?? '{}';
        const { player = '' }: { player: string } = JSON.parse(messageValue);
        addPlayer(player); // Run Async
        logger.info(
          `📩 Received message: ${topic} ${partition} ${message.value?.toString()}`
        );
      },
    });

    logger.info(`🚀 Kafka Consumer is Running...`);
  } catch (error) {
    logger.error('❌ Kafka Consumer Error:', error);
  }
};
