// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';

const LEMON_SQUEEZY_API_KEY: string = process.env.LEMON_SQUEEZY_API_KEY ?? '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId } = req.body;

  try {
    const method: string = 'POST';
    const url: string = 'https://api.lemonsqueezy.com/v1/checkouts';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
    };
    const body = JSON.stringify({ checkout: { product_id: productId } });
    const response = await fetch(url, { method, headers, body });

    if (!response.ok) {
      throw new Error(`Lemon Squeezy API error: ${response.statusText}`);
    }

    const data = await response.json();
    // Send back the checkout URL
    res.status(200).json({ url: data.data.attributes.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
