import React from 'react';
import PropTypes from 'prop-types';
import { ArticleMeta } from '../article-meta';
import { gql } from '@apollo/client';

export function ArticlePageBanner({
  author,
  canDelete,
  canFavorite,
  canUnfavorite,
  canUpdate,
  createdAt,
  favoritesCount,
  onDelete,
  onFavorite,
  onFollow,
  onUnfavorite,
  onUnfollow,
  slug,
  title,
  viewerDidFavorite,
}) {
  return (
    <div className="text-white mb-8 px-0 p-8 bg-[#333]">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-[2.8rem] font-semibold mb-0 pb-2 drop-shadow-lg">
          {title}
        </h1>
        <ArticleMeta
          author={author}
          canDelete={canDelete}
          canFavorite={canFavorite}
          canUnfavorite={canUnfavorite}
          canUpdate={canUpdate}
          createdAt={createdAt}
          favoritesCount={favoritesCount}
          onDelete={onDelete}
          onFavorite={onFavorite}
          onFollow={onFollow}
          onUnfavorite={onUnfavorite}
          onUnfollow={onUnfollow}
          slug={slug}
          viewerDidFavorite={viewerDidFavorite}
        />
      </div>
    </div>
  );
}

ArticlePageBanner.fragments = {
  author: gql`
    fragment ArticlePageBannerAuthorFragment on User {
      ...ArticleMetaAuthorFragment
    }
    ${ArticleMeta.fragments.author}
  `,
  article: gql`
    fragment ArticlePageBannerArticleFragment on Article {
      title
      ...ArticleMetaArticleFragment
    }
    ${ArticleMeta.fragments.article}
  `,
};

ArticlePageBanner.propTypes = {
  author: PropTypes.object.isRequired,
  canDelete: PropTypes.object,
  canFavorite: PropTypes.object,
  canUnfavorite: PropTypes.object,
  canUpdate: PropTypes.object,
  createdAt: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfavorite: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  viewerDidFavorite: PropTypes.bool,
};
