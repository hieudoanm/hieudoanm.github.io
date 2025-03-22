import { postRoute } from './convert/post';

export const routes = [
  { method: 'POST', path: '/api/convert', function: postRoute },
];
