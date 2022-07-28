import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(' ');
};

export type DropdownProps = {
  label?: string;
  icon?: ReactNode;
  options: { text: ReactNode; onClick: () => void }[];
  align?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label = '',
  icon = <FaChevronDown className="ml-2" aria-hidden="true" />,
  options = [],
  align = 'right',
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="uppercase inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {label}
          {icon}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`${
            align === 'right' ? 'right-0' : 'left-0'
          } origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {options.map(
              (
                { text, onClick }: { text: ReactNode; onClick: () => void },
                index: number
              ) => {
                return (
                  <Menu.Item key={`option-${index}`}>
                    {({ active }) => (
                      <button
                        onClick={onClick}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'text-left w-full uppercase cursor-pointer block px-4 py-2 text-sm'
                        )}
                      >
                        {text}
                      </button>
                    )}
                  </Menu.Item>
                );
              }
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
