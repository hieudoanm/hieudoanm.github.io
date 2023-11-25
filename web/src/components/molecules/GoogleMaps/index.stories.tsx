import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GoogleMaps, { GoogleMapsProps } from './index';

export default {
  title: 'molecules/GoogleMaps',
  component: GoogleMaps,
} as ComponentMeta<typeof GoogleMaps>;

const Template: ComponentStory<typeof GoogleMaps> = (args: GoogleMapsProps) => (
  <GoogleMaps {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
