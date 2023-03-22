import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';
import { gql } from '@apollo/client';

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  startCursor,
  endCursor,
}) {
  const router = useRouter();
  return (
    <nav>
      <ul className="inline-block rounded my-4 pl-0">
        <li
          className={clsx('inline bg-white border-[#ddd]', {
            'text-[#818a91] pointer-events-none cursor-not-allowe':
              hasPreviousPage === false,
            'text-[#5cb85c] cursor-not-allowed': hasPreviousPage === true,
          })}
        >
          <Link
            href={{
              pathname: router.pathname,
              query: router.query.tagName
                ? {
                    before: startCursor,
                    last: 10,
                    tagName: router.query.tagName,
                  }
                : {
                    before: startCursor,
                    last: 10,
                  },
            }}
          >
            <a className="relative float-left hover:no-underline no-underline active:no-underline bg-white border u-ml-px px-3 py-2 border-solid border-[#ddd]page-link ">
              Previous
            </a>
          </Link>
        </li>
        <li
          className={clsx('inline bg-white border-[#ddd]', {
            'text-[#818a91] pointer-events-none cursor-not-allowed ':
              hasNextPage === false,
            'text-[#5cb85c] cursor-not-allowed': hasNextPage === true,
          })}
        >
          <Link
            href={{
              pathname: router.pathname,
              query: router.query.tagName
                ? {
                    after: endCursor,
                    first: 10,
                    tagName: router.query.tagName,
                  }
                : {
                    after: endCursor,
                    first: 10,
                  },
            }}
          >
            <a className="relative float-left no-underline hover:no-underline active:no-underline bg-white border -ml-px px-3 py-2 rounded-br rounded-tr border-solid border-[#ddd]">
              Next
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Pagination.fragments = {
  pageInfo: gql`
    fragment PaginationPageInfoFragment on PageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  `,
};

Pagination.defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
  endCursor: null,
};

Pagination.propTypes = {
  endCursor: PropTypes.string,
  hasNextPage: PropTypes.bool,
  startCursor: PropTypes.string,
  hasPreviousPage: PropTypes.bool,
};
