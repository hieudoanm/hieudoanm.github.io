import React from 'react';

const AccordianContext = React.createContext({
  isOpen: false,
  activeId: '',
  toggleAccordion: (id: string) => {
    console.log(id);
  },
});

export default AccordianContext;
