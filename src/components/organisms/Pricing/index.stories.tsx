import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pricing, { PricingProps } from './index';

export default {
  title: 'organisms/Pricing',
  component: Pricing
} as ComponentMeta<typeof Pricing>;

const Template: ComponentStory<typeof Pricing> = (args: PricingProps) => (
  <Pricing {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
