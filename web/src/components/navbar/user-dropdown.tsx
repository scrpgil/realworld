import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';

export function NavbarUserDropdown({ username }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={clsx('ml-4 float-left relative', { open })}>
      <a
        className="block py-2 user-nav-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={event => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        {username}
      </a>
      <div
        className={clsx(
          'absolute z-[1000] float-left min-w-[160px] text-base text-[#373a3c] text-left bg-white bg-clip-padding border rounded mt-0.5 mb-0 mx-0 px-0 py-[5px] border-solid border-[rgba(0,0,0,0.15)] left-0 top-full',
          {
            block: open,
            hidden: !open,
          }
        )}
        aria-labelledby="navbarDropdownMenuLink"
      >
        <Link href="/user/[username]" as={`/user/${username}`}>
          <a
            className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>
        </Link>
        <Link href="/settings">
          <a
            className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0"
            onClick={() => setOpen(false)}
          >
            Settings
          </a>
        </Link>
        <Link href="/logout">
          <a
            className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0"
            onClick={() => setOpen(false)}
          >
            Logout
          </a>
        </Link>
      </div>
    </li>
  );
}

NavbarUserDropdown.propTypes = {
  username: PropTypes.string.isRequired,
};
