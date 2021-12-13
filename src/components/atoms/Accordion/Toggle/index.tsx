import React from 'react';
import Context from '../Context';

type ToggleProps = {
  accordionItemId: string;
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Toggle: React.FC<ToggleProps> = ({
  accordionItemId,
  children,
}: ToggleProps) => {
  return (
    <Context.Consumer>
      {({ toggleAccordion }) => (
        <div className="p-4">
          <div
            aria-hidden="true"
            className="cursor-pointer"
            onClick={() => toggleAccordion(accordionItemId)}
          >
            {children}
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

Toggle.displayName = 'Accordion.Toggle';

export default Toggle;
