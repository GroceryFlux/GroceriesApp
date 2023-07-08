import React from 'react';
import BackButton from './BackButton';
import SpacingIcon from '../Icons/SpacingIcon';

function Header() {
  return (
    <>
      <BackButton />
      <h1 className="font-medium text-4xl text-center">Groceries</h1>
      <SpacingIcon/>
    </>
  );
}

export default Header;
