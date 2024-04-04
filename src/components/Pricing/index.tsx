import { Button } from '@chakra-ui/react';
import Container from '@hieudoanm/components/Container';
import Header from '@hieudoanm/components/Header';
import type React from 'react';
import { useState } from 'react';
import { FaCheck, FaPaypal, FaWallet } from 'react-icons/fa';

export type Payment = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export type Price = {
  value: string;
  unit: string;
};

export type Plan = {
  id: string;
  title: string;
  description: string;
  price: Record<'vnd' | 'usd' | string, Price>;
  features: Array<string>;
  timeUnit: string;
};

export type PricingSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  plans: Array<Plan>;
};

const PricingSection: React.FC<PricingSectionProperties> = ({
  id: sectionId = '',
  title: sectionTitle = '',
  subtitle = '',
  plans = [],
}) => {
  const [currency, setCurrency] = useState('vnd');

  const links: Record<'vnd' | 'usd' | string, Payment> = {
    vnd: {
      href: 'https://nhantien.momo.vn/0983117854',
      title: 'Momo',
      icon: <FaWallet />,
    },
    usd: {
      href: 'https://paypal.me/hieudoanm',
      title: 'Paypal',
      icon: <FaPaypal />,
    },
  };

  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="mx-auto mb-8 flex w-full items-center overflow-hidden rounded-lg border md:w-6/12">
          <button
            type="button"
            className={`w-6/12 cursor-pointer py-4 text-center ${
              currency === 'vnd' ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => {
              setCurrency('vnd');
            }}>
            VND
          </button>
          <button
            type="button"
            className={`w-6/12 cursor-pointer py-4 text-center ${
              currency === 'usd' ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => {
              setCurrency('usd');
            }}>
            USD
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map(
            ({
              id = '',
              title = '',
              description = '',
              price = {},
              features = [],
              timeUnit = '',
            }: Plan) => {
              return (
                <div key={`pricing-${id}`} className="rounded-lg border">
                  <div className="border-b p-8">
                    <h2 className="mb-8 text-2xl font-semibold">{title}</h2>
                    <p className="mb-8 text-gray-500">{description}</p>
                    <p className="mb-8">
                      <span className="mr-2 text-3xl font-semibold">
                        {price[`${currency}`].value}
                      </span>
                      <sup className="text-lg text-gray-500">
                        {price[`${currency}`].unit}/{timeUnit}
                      </sup>
                    </p>
                    <a
                      href={links[`${currency}`].href}
                      target="_blank"
                      rel="noreferrer">
                      <Button className="w-full uppercase">
                        <div className="flex items-center justify-center gap-4">
                          {links[`${currency}`].icon}
                          <span>{links[`${currency}`].title}</span>
                        </div>
                      </Button>
                    </a>
                  </div>
                  <div className="p-8">
                    <h3 className="mb-8 font-semibold uppercase">
                      What&apos;s included
                    </h3>
                    {features.map((feature: string) => {
                      return (
                        <p
                          key={`feature-${feature}`}
                          className="flex items-start text-gray-500">
                          <FaCheck color="#10B981" className="mr-2" />
                          <span className="text-sm">{feature}</span>
                        </p>
                      );
                    })}
                    <p>Lorem Ipsum</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Container>
    </div>
  );
};

PricingSection.displayName = 'PricingSection';

export default PricingSection;
