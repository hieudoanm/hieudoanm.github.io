import GradientButton from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Container from '@mui/material/Container';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="bg-gray-100 py-8 md:py-16">
      <Container>
        <Heading gradient className="text-gray-900">
          Pricing
        </Heading>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              id: '1',
              plan: 'Free',
              features: ['feature 1', 'feature 2', 'feature 3', 'feature 4'],
              price: 0,
            },
            {
              id: '2',
              plan: 'Basic',
              features: ['feature 5', 'feature 6', 'feature 7', 'feature 8'],
              price: 9.99,
            },
            {
              id: '3',
              plan: 'Pro',
              features: ['feature 9', 'feature 10', 'feature 11', 'feature 12'],
              price: 19.99,
            },
          ].map(({ id, plan, features, price }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="rounded border bg-white shadow">
                  <div className="py-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-700">{plan}</h2>
                  </div>
                  <div className="gradient h-1 w-full" />
                  <div className="text-gray-500">
                    {features.map((feature) => {
                      return (
                        <div
                          key={feature}
                          className="border-b py-4 text-center capitalize"
                        >
                          {feature}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 py-8">
                    <h3 className="text-center text-3xl text-gray-900">
                      ${price}
                    </h3>
                    <GradientButton scrolled className="mx-auto">
                      Download
                    </GradientButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
