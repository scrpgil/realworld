import React from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';

export function ArticlePreviewTagsList({ tags }) {
  if (tags.length === 0) return null;

  return (
    <ul className="float-right max-w-[50%] align-top inline-block pl-0">
      {tags.map(tag => (
        <li key={tag.id} className="bg-[#818a91] text-white whitespace-nowrap inline-block font-light text-[0.8rem] mr-[3px] px-[0.6em] py-0 mb-auto rounded-[10rem] ">
          {tag.name}
        </li>
      ))}
    </ul>
  );
}

ArticlePreviewTagsList.fragments = {
  article: gql`
    fragment ArticlePreviewTagsListArticleFragment on Article {
      tags {
        id
        name
      }
    }
  `,
};

ArticlePreviewTagsList.defaultProps = {
  tags: [],
};

ArticlePreviewTagsList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
