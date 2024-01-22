import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Divider,
} from '@chakra-ui/react';
import { Layout } from '@chess/layout';
import { NextPage } from 'next';

const PaymentPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>Payment Success</CardHeader>
            <Divider />
            <CardFooter>
              <Button type="button" colorScheme="teal">
                Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentPage;
