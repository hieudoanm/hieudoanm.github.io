import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input, { InputProps } from './index';

export default {
  title: 'atoms/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <Input {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
