import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Contact, { ContactProps } from './index';

export default {
  title: 'organisms/Contact',
  component: Contact
} as ComponentMeta<typeof Contact>;

const Template: ComponentStory<typeof Contact> = (args: ContactProps) => (
  <Contact {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
