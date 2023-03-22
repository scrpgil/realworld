import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';

export function UserArticlesToggle({ username }) {
  const router = useRouter();
  return (
    <div className="mt-6 -mb-px mx-0">
      <ul className="mb-0 pl-0 tw-nav-pills tw-outline-active">
        <li className="float-left">
          <Link href="/user/[username]" as={`/user/${username}`}>
            <a
              className={clsx(
                'text-[#aaa] hover:text-[#aaa] block px-[1em] py-[0.5em] no-underline hover:no-underline',
                {
                  'text-[#5cb85c] hover:text-[#5cb85c] border-b-2 border-b-[#5cb85c] border-solid bg-[#fff]':
                    router.pathname === '/user/[username]',
                }
              )}
            >
              My Articles
            </a>
          </Link>
        </li>
        <li className="float-left ml-1">
          <Link
            href="/user/[username]/favorites"
            as={`/user/${username}/favorites`}
          >
            <a
              className={clsx(
                'text-[#aaa] hover:text-[#aaa] block px-[1em] py-[0.5em] no-underline hover:no-underline',
                {
                  'text-[#5cb85c] hover:text-[#5cb85c] border-b-2 border-b-[#5cb85c] border-solid bg-[#fff]':
                    router.pathname === '/user/[username]/favorites',
                }
              )}
            >
              Favorited Articles
            </a>
          </Link>
        </li>
        <div className="clear-both"></div>
      </ul>
    </div>
  );
}

UserArticlesToggle.fragments = {
  user: gql`
    fragment UserArticlesToggleUserFragment on User {
      username
    }
  `,
};

UserArticlesToggle.propTypes = {
  username: PropTypes.string.isRequired,
};
