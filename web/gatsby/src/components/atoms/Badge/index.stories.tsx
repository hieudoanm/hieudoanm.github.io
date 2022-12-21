import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Badge, { BadgeProps } from './index';

export default {
  title: 'atoms/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args: BadgeProps) => (
  <Badge {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
