import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExperiencesSection, { ExperiencesSectionProps } from './index';

export default {
  title: 'organisms/Experiences',
  component: ExperiencesSection,
} as ComponentMeta<typeof ExperiencesSection>;

const Template: ComponentStory<typeof ExperiencesSection> = (
  args: ExperiencesSectionProps
) => <ExperiencesSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
