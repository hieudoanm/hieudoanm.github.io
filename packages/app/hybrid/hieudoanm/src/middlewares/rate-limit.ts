import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

// Define the shape of each IP's rate limit data
interface RateLimitData {
  count: number;
  lastReset: number;
}

// Map to store IPs and their rate limit data
const rateLimitMap = new Map<string, RateLimitData>();

// Type the middleware: it wraps a NextApiHandler
const rateLimitMiddleware = (handler: NextApiHandler): NextApiHandler => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const ip =
      ((req.headers['x-forwarded-for'] as string) ||
        req.socket.remoteAddress) ??
      '';

    const limit = 5; // requests per window
    const windowMs = 60 * 1000; // 1 minute

    // Initialize or reset rate limit data for the IP
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip)!;

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return res.status(429).send('Too Many Requests');
    }

    ipData.count += 1;

    return handler(req, res);
  };
};

export default rateLimitMiddleware;
