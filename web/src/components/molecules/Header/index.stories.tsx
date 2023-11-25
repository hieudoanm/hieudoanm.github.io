import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header, { HeaderProps } from './index';

export default {
  title: 'molecules/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => (
  <Header {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
