import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card, { CardProps } from './index';

export default {
  title: 'atoms/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
