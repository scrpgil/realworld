import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ArticleInfo } from '../article-info';
import { ArticlePreviewFavoriteButton } from './favorite-button';
import { ArticlePreviewTagsList } from './tags-list';
import { gql } from '@apollo/client';
import { UserAvatarLink } from '../user-avatar-link';

export function ArticlePreview({
  author,
  canFavorite,
  canUnfavorite,
  createdAt,
  description,
  favoritesCount,
  onFavorite,
  onUnfavorite,
  slug,
  tags,
  title,
  viewerDidFavorite,
}) {
  return (
    <div className="px-0 py-6 border-t-[rgba(0,0,0,0.1)] border-t border-solid">
      <div className="block relative font-light mt-0 mb-4 mx-0">
        <UserAvatarLink size="32" {...author} />
        <ArticleInfo createdAt={createdAt} author={author} />
        <div className="float-right">
          <ArticlePreviewFavoriteButton
            canFavorite={canFavorite}
            canUnfavorite={canUnfavorite}
            favoritesCount={favoritesCount}
            onFavorite={onFavorite}
            onUnfavorite={onUnfavorite}
            slug={slug}
            viewerDidFavorite={viewerDidFavorite}
          />
        </div>
      </div>
      <Link href="/article/[slug]" as={`/article/${slug}`}>
        <a className="text-inherit hover:text-inherit hover:no-underline">
          <h1 className="font-semibold text-2xl mb-[3px]">{title}</h1>
          <p className="font-light text-[#999] text-base leading-[1.3rem] mb-[15px]">
            {description}
          </p>
          <span className="max-w-[30%] text-[0.8rem] font-light text-[#bbb] align-middle">
            Read more...
          </span>
          <ArticlePreviewTagsList tags={tags} />
        </a>
      </Link>
    </div>
  );
}

ArticlePreview.fragments = {
  author: gql`
    fragment ArticlePreviewAuthorFragment on User {
      ...UserAvatarLinkUserFragment
    }
    ${UserAvatarLink.fragments.user}
  `,
  article: gql`
    fragment ArticlePreviewArticleFragment on Article {
      title
      description
      ...ArticleInfoArticleFragment
      ...ArticlePreviewFavoriteButtonArticleFragment
      ...ArticlePreviewTagsListArticleFragment
    }
    ${ArticleInfo.fragments.article}
    ${ArticlePreviewFavoriteButton.fragments.article}
    ${ArticlePreviewTagsList.fragments.article}
  `,
};

ArticlePreview.defaultProps = {
  favoritesCount: 0,
  viewerDidFavorite: false,
};

ArticlePreview.propTypes = {
  author: PropTypes.object,
  canFavorite: PropTypes.object,
  canUnfavorite: PropTypes.object,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number,
  onFavorite: PropTypes.func,
  onUnfavorite: PropTypes.func,
  slug: PropTypes.string.isRequired,
  tags: PropTypes.array,
  title: PropTypes.string.isRequired,
  viewerDidFavorite: PropTypes.bool,
};
