import Container from '@hieudoanm/components/Container';
import Header from '@hieudoanm/components/Header';
import React from 'react';

export type Testimonial = {
  quote: string;
  author: string;
  position: string;
};

export type TestimonialsSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
};

const TestimonialsSection: React.FC<TestimonialsSectionProperties> = ({
  id,
  title,
  subtitle,
  testimonials,
}) => {
  return (
    <section id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        {testimonials.map((testimonial: Testimonial, index: number) => {
          return (
            <div
              key={`testimonial-${index}`}
              className="mx-auto w-full md:w-6/12">
              <p className="mb-8 text-justify text-2xl">{testimonial.quote}</p>
              <p className="text-left md:text-right">
                <b>{testimonial.author}</b> / {testimonial.position}
              </p>
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default TestimonialsSection;
