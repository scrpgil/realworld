import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';

export function SidebarTagList({ popularTags }) {
  const router = useRouter();

  if (popularTags.length === 0) return null;

  return (
    <div className="tag-list">
      {popularTags.map(tag => (
        <Link
          href={{ pathname: router.pathname, query: { tagName: tag.name } }}
          key={tag.id}
        >
          <a
            className={clsx(
              'px-[0.6em] rounded-[10rem] text-[0.8rem] whitespace-nowrap inline-block mr-[3px] mb-[0.2rem] py-[0.1rem] bg-[#818a91]',
              {
                'tag-outline border border-solid border-[#ddd] bg-[0_0] bg-[initial] text-[#aaa] hover:text-[#aaa] active:text-[#aaa]':
                  router.query.tagName !== tag.name,
                'text-[#fff] hover:text-white active:text-white focus:text-white':
                  router.query.tagName === tag.name,
              }
            )}
          >
            {tag.name}
          </a>
        </Link>
      ))}
    </div>
  );
}

SidebarTagList.fragments = {
  tag: gql`
    fragment SidebarTagListTagFragment on Tag {
      id
      name
    }
  `,
};

SidebarTagList.defaultProps = {
  popularTags: [],
};

SidebarTagList.propTypes = {
  popularTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
