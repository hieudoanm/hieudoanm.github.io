import React from 'react';
import Collapse from '../../Collapse';
import AccordionContext from '../Context';

export type AccordionCollapseProps = {
  accordionItemId: string;
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const AccordionCollapse: React.FC<AccordionCollapseProps> = ({
  children,
  accordionItemId,
}: AccordionCollapseProps) => {
  return (
    <AccordionContext.Consumer>
      {({ isOpen, activeId }) => {
        const active: boolean = isOpen && activeId === accordionItemId;
        return (
          <Collapse active={active}>
            <div className="p-4">{children}</div>
          </Collapse>
        );
      }}
    </AccordionContext.Consumer>
  );
};

AccordionCollapse.displayName = 'Accordion.Collapse';

export default AccordionCollapse;
