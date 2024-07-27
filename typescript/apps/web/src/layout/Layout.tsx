import { Footer } from '@web/components/Footer';
import { Navbar } from '@web/components/Navbar';
import { FC, ReactNode } from 'react';
import { TbMathFunction } from 'react-icons/tb';

export type LayoutProps = {
  nav?: boolean;
  navBorder?: boolean;
  full?: boolean;
  footer?: boolean;
  footerBorder?: boolean;
  footerContent?: ReactNode;
  children?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({
  nav = false,
  navBorder = false,
  full = false,
  footer = false,
  footerBorder = false,
  footerContent = <TbMathFunction />,
  children = <></>,
}) => {
  const height: string = full ? 'h-screen overflow-hidden' : 'min-h-screen';

  return (
    <div className={`flex flex-col ${height}`}>
      {nav ? <Navbar border={navBorder} /> : <></>}
      <div className='grow overflow-auto'>{children}</div>
      {footer ? <Footer border={footerBorder}>{footerContent}</Footer> : <></>}
    </div>
  );
};
