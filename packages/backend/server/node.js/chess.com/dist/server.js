"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const consumer_1 = require("./server/consumer");
const producer_1 = require("./server/producer");
const log_1 = require("./utils/log");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, producer_1.startProducerServer)();
    yield (0, consumer_1.startConsumerServer)();
});
// Handle graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    log_1.logger.info('🔄 Shutting down Kafka consumer...');
    yield producer_1.producer.disconnect();
    yield consumer_1.consumer.disconnect();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    log_1.logger.info('🔄 Shutting down Kafka consumer...');
    yield producer_1.producer.disconnect();
    yield consumer_1.consumer.disconnect();
    process.exit(0);
}));
startServer();
