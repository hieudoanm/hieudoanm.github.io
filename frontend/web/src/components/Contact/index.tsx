import { Button, Input, Textarea } from '@chakra-ui/react';
import Container from '@hieudoanm/components/Container';
import GoogleMaps from '@hieudoanm/components/GoogleMaps';
import Header from '@hieudoanm/components/Header';
import React, { useState } from 'react';

const sendMessage = (event: React.FormEvent) => {
  event.preventDefault();
};

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form onSubmit={sendMessage}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <label>Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            className="w-full"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1">
          <label>Phone</label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            className="w-full"
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1">
          <label>Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            className="w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label>Message</label>
          <Textarea
            rows={4}
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

export type ContactSectionProperties = {
  id: string;
  title: string;
  subtitle?: string;
};

const ContactSection: React.FC<ContactSectionProperties> = ({
  id,
  title,
  subtitle = '',
}) => {
  return (
    <div id={id} className="py-16">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <GoogleMaps
              title="Ho Chi Minh City"
              source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3382572512!2d106.41504093423713!3d10.755341071141125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1634894512761!5m2!1svi!2s"
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
