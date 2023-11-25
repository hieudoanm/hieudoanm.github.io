import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Newsletter, { NewsletterProps } from './index';

export default {
  title: 'organisms/Newsletter',
  component: Newsletter,
} as ComponentMeta<typeof Newsletter>;

const Template: ComponentStory<typeof Newsletter> = (args: NewsletterProps) => (
  <Newsletter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
