import React, { useState } from 'react';
import Button from '../../atoms/Button';
import Container from '../../atoms/Container';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import GoogleMaps from '../../molecules/GoogleMaps';
import Header from '../../molecules/Header';

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={sendMessage}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Input
            full
            label="Name"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Phone"
            full
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Email"
            full
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Textarea
            rows={4}
            label="Message"
            id="message"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Button>Send Message</Button>
        </div>
      </div>
    </form>
  );
};

export type ContactSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
};

const ContactSection: React.FC<ContactSectionProps> = ({
  id,
  title,
  subtitle = '',
}) => {
  return (
    <div id={id} className="py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="order-2 md:order-1">
            <GoogleMaps
              title="Ho Chi Minh City"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3382572512!2d106.41504093423713!3d10.755341071141125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1634894512761!5m2!1svi!2s"
            />
          </div>
          <div className="order-1 md:order-2">
            <Header
              align="text-center md:text-left"
              padding="pb-16"
              subtitle={subtitle}
            >
              {title}
            </Header>
            <Form />
          </div>
        </div>
      </Container>
    </div>
  );
};

ContactSection.displayName = 'ContactSection';

export default ContactSection;
