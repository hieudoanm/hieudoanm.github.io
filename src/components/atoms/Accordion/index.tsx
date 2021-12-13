import React, { useState } from 'react';
import Collapse from './Collapse';
import Context from './Context';
import Toggle from './Toggle';

export type AccordionProps = {
  activeAccordianId?: string;
  className?: string;
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Accordion = ({
  children,
  activeAccordianId,
  className = '',
}: AccordionProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [activeId, setActive] = useState(activeAccordianId || '');
  const [selectedId, setSelected] = useState('');

  const toggleAccordion = (newSelectedId: string) => {
    if (newSelectedId !== selectedId) {
      setSelected(newSelectedId);
      setActive(newSelectedId);
      setOpen(true);
    } else {
      setSelected('');
      setActive('');
      setOpen(false);
    }
  };

  return (
    <div className="border border-solid rounded border-gray-300">
      <Context.Provider value={{ isOpen, activeId, toggleAccordion }}>
        <div className={className}>{children}</div>
      </Context.Provider>
    </div>
  );
};

Accordion.displayName = 'Accordion';
Accordion.defaultProps = { activeAccordianId: '', className: '' };
Accordion.Collapse = Collapse;
Accordion.Toggle = Toggle;

export default Accordion;
