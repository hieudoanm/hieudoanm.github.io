import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Textarea, { TextareaProps } from './index';

export default {
  title: 'atoms/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: TextareaProps) => (
  <Textarea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
