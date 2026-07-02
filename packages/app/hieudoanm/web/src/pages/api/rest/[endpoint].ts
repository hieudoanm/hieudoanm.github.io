import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getHandler } from '../../../server/rest';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint: ep } = req.query;

  if (typeof ep !== 'string' || !ep) {
    res.status(400).json({ error: 'Endpoint name required' });
    return;
  }

  const fn = getHandler(ep);

  if (!fn) {
    res.status(404).json({ error: `Unknown endpoint '${ep}'` });
    return;
  }

  return fn(req, res);
};

export default handler;
