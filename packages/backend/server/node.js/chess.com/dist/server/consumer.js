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
exports.startConsumerServer = exports.consumer = void 0;
const kafka_1 = require("../clients/kafka");
const constants_1 = require("../constants/constants");
const chess_service_1 = require("../services/chess.service");
const log_1 = require("../utils/log");
exports.consumer = kafka_1.kafka.consumer({ groupId: 'chess-group' });
const startConsumerServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.consumer.connect();
        log_1.logger.info('✅ Kafka Consumer Connected');
        yield exports.consumer.subscribe({ topic: constants_1.TOPIC, fromBeginning: true });
        yield exports.consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d;
                const messageValue = (_c = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '{}';
                const { player = '' } = JSON.parse(messageValue);
                (0, chess_service_1.addPlayer)(player); // Run Async
                log_1.logger.info(`📩 Received message: ${topic} ${partition} ${(_d = message.value) === null || _d === void 0 ? void 0 : _d.toString()}`);
            }),
        });
        log_1.logger.info(`🚀 Kafka Consumer is Running...`);
    }
    catch (error) {
        log_1.logger.error('❌ Kafka Consumer Error:', error);
    }
});
exports.startConsumerServer = startConsumerServer;
