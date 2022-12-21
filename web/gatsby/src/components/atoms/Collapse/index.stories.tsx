import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Collapse, { CollapseProps } from './index';

export default {
  title: 'atoms/Collapse',
  component: Collapse,
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args: CollapseProps) => (
  <Collapse {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
