import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Banner, { BannerProps } from './index';

export default {
  title: 'molecules/Banner',
  component: Banner
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args: BannerProps) => (
  <Banner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
