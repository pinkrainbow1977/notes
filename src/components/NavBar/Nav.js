import '@reshuffle/code-transform/macro';
import React from 'react';
import { useAuth } from '@reshuffle/react-auth';

const Nav = () => {
  const { authenticated, profile, getLoginURL, getLogoutURL } = useAuth();
  return (
    <nav className='nav-bar'>
      <h2 className='app-header'>Notes App</h2>
      <div>
        {authenticated ? (
          <>
            <img alt={profile.displayName} src={profile.picture} height={20} />
            <span>{profile.displayName}</span>
            <a className='nav-btns' href={getLogoutURL()}>
              Logout
            </a>
          </>
        ) : (
          <a className='nav-btns' href={getLoginURL()}>
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
