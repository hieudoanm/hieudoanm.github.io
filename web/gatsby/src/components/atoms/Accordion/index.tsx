import React, { useState } from 'react';
import Collapse from './Collapse';
import Context from './Context';
import Toggle from './Toggle';

export type AccordionProps = {
  activeAccordianId?: string;
  className?: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  children,
  activeAccordianId,
  className = '',
}) => {
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

export default Object.assign(Accordion, { Collapse, Toggle });
