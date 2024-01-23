import pino from 'pino';
import pretty from 'pino-pretty';
import { LOG_LEVEL } from '../../environments/environments';

const stream = pretty({ colorize: true });

export const logger = pino({ level: LOG_LEVEL }, stream);
