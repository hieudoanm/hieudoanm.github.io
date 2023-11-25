import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Testimonial, { TestimonialsProps } from './index';

export default {
  title: 'organisms/Testimonial',
  component: Testimonial,
} as ComponentMeta<typeof Testimonial>;

const Template: ComponentStory<typeof Testimonial> = (
  args: TestimonialsProps
) => <Testimonial {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
