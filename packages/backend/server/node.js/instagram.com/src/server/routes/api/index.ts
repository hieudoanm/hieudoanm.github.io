import { postRoute } from './download/post';

export const routes = [
  { method: 'POST', path: '/api/download', function: postRoute },
];
