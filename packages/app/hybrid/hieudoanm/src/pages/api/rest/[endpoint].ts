import { getHandler } from '@hieudoanm.github.io/server/rest';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const ep = req.query.endpoint as string;
  const fn = getHandler(ep);
  if (!fn) {
    return res.status(404).json({ error: `Unknown endpoint '${ep}'` });
  }
  await fn(req, res);
};

export default handler;
