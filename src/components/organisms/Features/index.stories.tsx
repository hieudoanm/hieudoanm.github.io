import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Features, { FeaturesProps } from './index';

export default {
  title: 'organisms/Features',
  component: Features
} as ComponentMeta<typeof Features>;

const Template: ComponentStory<typeof Features> = (args: FeaturesProps) => (
  <Features {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
