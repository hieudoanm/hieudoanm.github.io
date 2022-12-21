import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion, { AccordionProps } from './index';

export default {
  title: 'atoms/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
