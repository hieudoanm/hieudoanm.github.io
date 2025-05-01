import { postRoute as postInstagramDownloadRoute } from './instagram/download/post';
import { postRoute as postConvertRoute } from './pdfmake/convert/post';
import { postRoute as postYouTubeDownloadRoute } from './youtube/download/post';
import { postRoute as postYouTubeDonwloadTriggerRoute } from './youtube/download/trigger/post';

export const apiRoutes = [
  {
    method: 'POST',
    path: '/api/instagram/download',
    function: postInstagramDownloadRoute,
  },
  {
    method: 'POST',
    path: '/api/pdfmake/convert',
    function: postConvertRoute,
  },
  {
    method: 'POST',
    path: '/api/youtube/download',
    function: postYouTubeDownloadRoute,
  },
  {
    method: 'POST',
    path: '/api/youtube/download/trigger',
    function: postYouTubeDonwloadTriggerRoute,
  },
];
