import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';

export function ViewerFeedToggle({ username }) {
  const router = useRouter();
  return (
    <>
      <div className="feed-toggle">
        <ul className="mb-0 pl-0 clearfix">
          <li className="float-left">
            {username ? (
              <Link href="/feed">
                <a
                  className={clsx('nav-pills-link', {
                    'nav-pills-link_active': router.pathname === '/feed',
                  })}
                >
                  Your Feed
                </a>
              </Link>
            ) : (
              <span className="nav-pills-link nav-pills-link_disable">
                Your Feed
              </span>
            )}
          </li>
          <li className="float-left">
            <Link href="/">
              <a
                className={clsx('nav-pills-link', {
                  'nav-pills-link_active': router.asPath === '/',
                })}
              >
                Global Feed
              </a>
            </Link>
          </li>
          {router.query.tagName && (
            <li className="float-left">
              <Link href={router.asPath}>
                <a
                  className={clsx('nav-pills-link', {
                    active: router.pathname === '/',
                  })}
                >
                  #{router.query.tagName}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="clear-both"></div>
    </>
  );
}

ViewerFeedToggle.fragments = {
  viewer: gql`
    fragment ViewerFeedToggleViewerFragment on User {
      username
    }
  `,
};

ViewerFeedToggle.propTypes = {
  username: PropTypes.string,
};
