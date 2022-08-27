import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Blogs, { BlogsProps } from './index';

export default {
  title: 'organisms/Blogs',
  component: Blogs,
} as ComponentMeta<typeof Blogs>;

const Template: ComponentStory<typeof Blogs> = (args: BlogsProps) => (
  <Blogs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
