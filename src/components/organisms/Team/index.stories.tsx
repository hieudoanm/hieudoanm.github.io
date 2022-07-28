import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Team, { TeamProps } from './index';

export default {
  title: 'organisms/Team',
  component: Team
} as ComponentMeta<typeof Team>;

const Template: ComponentStory<typeof Team> = (args: TeamProps) => (
  <Team {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
