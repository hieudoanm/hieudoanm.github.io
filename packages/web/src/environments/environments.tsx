export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const BASE_PATH = NODE_ENV === 'production' ? '/nothing' : '';
