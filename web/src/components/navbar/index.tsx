import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { NavbarUserDropdown } from './user-dropdown';

function NavLink({ href, as, children }) {
  const router = useRouter();

  return (
    <Link href={href} as={as}>
      <a
        className={clsx(
          'block text-gray-300 hover:text-gray-500 active:text-gray-800 py-2',
          {
            'text-gray-800': router.pathname === href,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function Navbar({ username }) {
  return (
    <nav className="relative px-5 py-2 mb-2">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/">
          <a className="brand-logo hover:no-underline text-2xl text-[#5cb85c] hover:text-[#5cb85c] mr-8 pt-0">
            Realworld
          </a>
        </Link>
        <ul className="mb-0 pl-0 float-right">
          {username ? (
            <>
              <li className="float-left">
                <NavLink href="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              <NavbarUserDropdown username={username} />
            </>
          ) : (
            <>
              <li className="float-left">
                <NavLink href="/login">Sign in</NavLink>
              </li>
              <li className="float-left ml-4">
                <NavLink href="/register">Sign up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
};
