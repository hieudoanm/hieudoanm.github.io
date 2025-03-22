import { getRoute } from './titled/get';
import { postRoute } from './titled/post';

export const routes = [
  { method: 'GET', path: '/api/titled', function: getRoute },
  { method: 'POST', path: '/api/titled', function: postRoute },
];
