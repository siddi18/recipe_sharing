// components/HeaderWrapper.js
'use client';

import { usePathname } from 'next/navigation';
import MainHeader from './main-header/main-header';

const HeaderWrapper = ({ children }) => {
  const path = usePathname();

  return (
    <>
      {path !== '/recipes' && <MainHeader />}
      {children}
    </>
  );
};

export default HeaderWrapper;
