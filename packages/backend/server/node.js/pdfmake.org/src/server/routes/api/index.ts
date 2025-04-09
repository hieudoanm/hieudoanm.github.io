import { postRoute as postConvertRoute } from './convert/post';

export const routes = [
  {
    method: 'POST',
    path: '/api/convert',
    function: postConvertRoute,
  },
];
