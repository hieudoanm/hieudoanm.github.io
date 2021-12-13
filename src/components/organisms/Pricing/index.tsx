import React, { useState } from 'react';
import { FaCheck, FaPaypal, FaWallet } from 'react-icons/fa';
import uuid from '../../../utils/uuid';
import Button from '../../atoms/Button';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Payment = {
  href: string;
  title: string;
  icon: any;
};

export type Price = {
  value: string;
  unit: string;
};

export type Plan = {
  title: string;
  description: string;
  price: Record<'vnd' | 'usd' | string, Price>;
  features: Array<string>;
  timeUnit: string;
};

export type PricingSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  plans: Array<Plan>;
};

const PricingSection: React.FC<PricingSectionProps> = ({
  id = '',
  title = '',
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
    <div id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        <div className="w-full md:w-6/12 mx-auto flex items-center mb-8 border rounded-lg overflow-hidden">
          <div
            className={`text-center w-6/12 py-4 cursor-pointer ${
              currency === 'vnd' ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => {
              setCurrency('vnd');
            }}
          >
            VND
          </div>
          <div
            className={`text-center w-6/12 py-4 cursor-pointer ${
              currency === 'usd' ? 'bg-white' : 'bg-gray-100'
            }`}
            onClick={() => {
              setCurrency('usd');
            }}
          >
            USD
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map(
            ({
              title = '',
              description = '',
              price = {},
              features = [],
              timeUnit = '',
            }: Plan) => {
              return (
                <div key={uuid()} className="border rounded-lg">
                  <div className="p-8 border-b">
                    <h2 className="text-2xl mb-8 font-semibold">{title}</h2>
                    <p className="text-gray-500 mb-8">{description}</p>
                    <p className="mb-8">
                      <span className="text-3xl mr-2 font-semibold">
                        {price[currency].value}
                      </span>
                      <sup className="text-lg text-gray-500">
                        {price[currency].unit}/{timeUnit}
                      </sup>
                    </p>
                    <a
                      href={links[currency].href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button full className="uppercase">
                        <div className="flex items-center justify-center gap-4">
                          {links[currency].icon}
                          <span>{links[currency].title}</span>
                        </div>
                      </Button>
                    </a>
                  </div>
                  <div className="p-8">
                    <h3 className="uppercase mb-8 font-semibold">
                      What&apos;s included
                    </h3>
                    {features.map((feature: string) => {
                      return (
                        <p
                          key={uuid()}
                          className="text-gray-500 flex items-start"
                        >
                          <FaCheck color="#10B981" className="mr-2" />
                          <span className="text-sm">{feature}</span>
                        </p>
                      );
                    })}
                    <p></p>
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
