import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { gql } from '@apollo/client';

export function ArticleContent({ description, body }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-md-12 md:con-span-12 col-span-12">
        <p className="tw-article-content">{description}</p>
        <Markdown className="tw-article-content">{body}</Markdown>
      </div>
    </div>
  );
}

ArticleContent.fragments = {
  article: gql`
    fragment ArticleContentArticleFragment on Article {
      body
      description
    }
  `,
};

ArticleContent.propTypes = {
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
