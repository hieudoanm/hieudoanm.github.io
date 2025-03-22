"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const log_1 = require("../utils/log");
exports.kafka = new kafkajs_1.Kafka({
    logCreator: () => {
        return ({ level, log }) => {
            const { message } = log, extra = __rest(log, ["message"]);
            if (level === kafkajs_1.logLevel.ERROR) {
                log_1.logger.error(message, extra);
            }
            else if (level === kafkajs_1.logLevel.DEBUG) {
                log_1.logger.debug(message, extra);
            }
            else if (level === kafkajs_1.logLevel.INFO) {
                log_1.logger.info(message, extra);
            }
            else if (level === kafkajs_1.logLevel.WARN) {
                log_1.logger.warn(message, extra);
            }
        };
    },
    clientId: 'chess.com-consumer',
    brokers: ['127.0.0.1:9092'], // Use 'kafka:9092' if inside Docker
});
