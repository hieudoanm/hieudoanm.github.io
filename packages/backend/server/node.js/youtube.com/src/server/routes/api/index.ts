import { postRoute as postDownloadRoute } from './download/post';
import { postRoute as postDonwloadTriggerRoute } from './download/trigger/post';

export const routes = [
  {
    method: 'POST',
    path: '/api/download',
    function: postDownloadRoute,
  },
  {
    method: 'POST',
    path: '/api/download/trigger',
    function: postDonwloadTriggerRoute,
  },
];
