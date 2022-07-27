import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown, { DropdownProps } from './index';

export default {
  title: 'molecules/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args: DropdownProps) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
