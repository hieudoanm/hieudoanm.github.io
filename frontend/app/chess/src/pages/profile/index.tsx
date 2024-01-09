import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Text,
} from '@chakra-ui/react';
import { logger } from '@chess/common/libs/logger';
import { getStripe } from '@chess/common/libs/stripe';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { RedirectToCheckoutOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';

const ProfilePage: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <Layout>
        <Container>
          <div className="py-8">
            <Card>
              <CardBody>Loading</CardBody>
            </Card>
          </div>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <div className="py-8">
            <Card>
              <CardBody>{error.message}</CardBody>
            </Card>
          </div>
        </Container>
      </Layout>
    );
  }

  const checkout = async () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const { data: checkoutSession } = await axios.post<Stripe.Checkout.Session>(
      '/api/stripe',
      { headers, data: { amount: 5 } }
    );
    logger.info(`checkoutSession`, checkoutSession);
    const stripe = await getStripe();
    const options: RedirectToCheckoutOptions = {
      sessionId: checkoutSession.id,
    };
    const response = await stripe!.redirectToCheckout(options);
    logger.info(`response`, response);
    if (error) {
      alert(response.error.message ?? 'Donate Error');
    }
  };

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Profile</h1>
                <Link href="/api/stripe">
                  <Button type="button" colorScheme="teal" onClick={checkout}>
                    Donate
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <div className="flex flex-col gap-y-1 md:gap-y-2">
                  <Text>Name</Text>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={user?.name ?? ''}
                  />
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-2">
                  <Text>Username</Text>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={user?.nickname ?? ''}
                  />
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-2">
                  <Text>Email Address</Text>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={user?.email ?? ''}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
