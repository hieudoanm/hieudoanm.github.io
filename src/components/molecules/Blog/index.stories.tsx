import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Blog, { BlogProps } from './index';

export default {
  title: 'molecules/Blog',
  component: Blog
} as ComponentMeta<typeof Blog>;

const Template: ComponentStory<typeof Blog> = (args: BlogProps) => (
  <Blog {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
