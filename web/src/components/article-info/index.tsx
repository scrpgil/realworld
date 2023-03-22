import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format } from '../../utils/date';
import { gql } from '@apollo/client';

export function ArticleInfo({ author, createdAt }) {
  return (
    <div className="inline-block align-middle leading-4 ml-[0.3rem] mr-6 my-0">
      <Link href="/user/[username]" as={`/user/${author.username}`}>
        <a className="block font-medium">{author.username}</a>
      </Link>
      <time dateTime={createdAt} className="text-[#bbb] text-[0.8rem] block">
        {format(new Date(createdAt), 'MMMM Qo')}
      </time>
    </div>
  );
}

ArticleInfo.fragments = {
  article: gql`
    fragment ArticleInfoArticleFragment on Article {
      author {
        username
      }
      createdAt
    }
  `,
};

ArticleInfo.propTypes = {
  author: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  createdAt: PropTypes.string.isRequired,
};
