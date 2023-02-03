import { Button, Container, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import React, { FormEvent } from 'react';
import img from '../../../assets/images/contact-img.svg';

const WhiteButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#b004b0',
  '&:hover': {
    backgroundColor: '#fff',
  },
  '&:active': {
    backgroundColor: '#fff',
  },
  '&:focus': {
    backgroundColor: '#fff',
  },
});

export const Contact: React.FC = () => {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return;
  };

  const whiteInput = {
    '& label': {
      color: 'white',

      '&.Mui-focused': {
        color: 'white',
      },
    },
    '& .MuiInputBase-root': {
      '& input': { color: 'white' },
      '& textarea': { color: 'white' },
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  };

  return (
    <div id="contact" className="bg-[linear-gradient(90deg,#b004b0,#38097a);]">
      <Container className="py-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1 hidden md:block">
            <Image className="h-full" src={img} alt="contact" />
          </div>
          <div className="col-span-1">
            <h1 className="mb-8 text-4xl font-bold text-white">Get In Touch</h1>
            <form onSubmit={submit} className="flex flex-col">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="col-span-1">
                  <TextField
                    label="First Name"
                    type={'text'}
                    id="firstName"
                    variant="outlined"
                    placeholder="First Name"
                    className="w-full"
                    sx={whiteInput}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    label="Last Name"
                    type={'text'}
                    id="lastName"
                    variant="outlined"
                    placeholder="Last Name"
                    className="w-full"
                    sx={whiteInput}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    label="Email Address"
                    type={'email'}
                    id="emailAddress"
                    variant="outlined"
                    placeholder="Email Address"
                    className="w-full"
                    sx={whiteInput}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    label="Phone Number"
                    type={'tel'}
                    id="phoneNumber"
                    variant="outlined"
                    placeholder="Phone Number"
                    className="w-full"
                    sx={whiteInput}
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <TextField
                    label="Message"
                    type="text"
                    id="message"
                    variant="outlined"
                    className="w-full"
                    sx={whiteInput}
                    required
                    multiline
                    rows={4}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <WhiteButton variant="contained" className="w-full">
                    Send
                  </WhiteButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
