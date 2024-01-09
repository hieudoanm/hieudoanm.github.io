import {
  NODE_ENV,
  STRIPE_PRICE_ID,
  STRIPE_SECRET_KEY,
} from '@chess/common/environments';
import { logger } from '@chess/common/libs/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

const URL =
  NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.BASE_URL;

const handler = async (
  _request: NextApiRequest,
  response: NextApiResponse<Stripe.Checkout.Session>
) => {
  try {
    const parameters: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(parameters);
    response.status(200).json(checkoutSession);
  } catch (error) {
    logger.error(`Error=${error}`);
    response.status(500);
  }
};

export default handler;
