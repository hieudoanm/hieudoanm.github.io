import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CTA, { CTAProps } from './index';

export default {
  title: 'organisms/CTA',
  component: CTA,
} as ComponentMeta<typeof CTA>;

const Template: ComponentStory<typeof CTA> = (args: CTAProps) => (
  <CTA {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
