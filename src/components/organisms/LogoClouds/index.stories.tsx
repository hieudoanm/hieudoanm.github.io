import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LogoClouds, { LogoCloudsProps } from './index';

export default {
  title: 'organisms/LogoClouds',
  component: LogoClouds
} as ComponentMeta<typeof LogoClouds>;

const Template: ComponentStory<typeof LogoClouds> = (args: LogoCloudsProps) => (
  <LogoClouds {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
