import { Stripe, loadStripe } from '@stripe/stripe-js';

const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (stripePromise === null) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};
