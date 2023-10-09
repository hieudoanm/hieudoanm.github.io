import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Hero, { HeroProps } from './index';

export default {
  title: 'organisms/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args: HeroProps) => (
  <Hero {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
