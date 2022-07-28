import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stats, { StatsProps } from './index';

export default {
  title: 'organisms/Stats',
  component: Stats
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args: StatsProps) => (
  <Stats {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
