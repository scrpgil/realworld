import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { gql } from '@apollo/client';

export function ArticlePreviewFavoriteButton({
  canFavorite,
  canUnfavorite,
  favoritesCount,
  onFavorite,
  onUnfavorite,
  slug,
  viewerDidFavorite,
}) {
  return (
    <button
      disabled={!(canFavorite.value || canUnfavorite.value)}
      className={clsx(
        'inline-block font-normal leading-tight text-center whitespace-nowrap align-middle select-none border border-solid text-sm px-2 py-1 rounded-[0.2rem]',
        {
          'text-[#5cb85c] bg-none bg-transparent border-[#5cb85c]':
            viewerDidFavorite === false,
          'text-white bg-[#5cb85c] border-[#5cb85c]': viewerDidFavorite,
          'cursor-pointer': canFavorite.value || canUnfavorite.value,
          'cursor-not-allowed': !(canFavorite.value || canUnfavorite.value),
        }
      )}
      onClick={() =>
        viewerDidFavorite
          ? onUnfavorite({ variables: { slug: slug } })
          : onFavorite({ variables: { slug: slug } })
      }
    >
      <i className="ion-heart" /> {favoritesCount}
    </button>
  );
}

ArticlePreviewFavoriteButton.fragments = {
  article: gql`
    fragment ArticlePreviewFavoriteButtonArticleFragment on Article {
      canFavorite {
        value
      }
      canUnfavorite {
        value
      }
      favoritesCount
      slug
      viewerDidFavorite
    }
  `,
};

ArticlePreviewFavoriteButton.defaultProps = {
  canFavorite: { value: false },
  canUnfavorite: { value: false },
  favoritesCount: 0,
  viewerDidFavorite: false,
};

ArticlePreviewFavoriteButton.propTypes = {
  canFavorite: PropTypes.shape({ value: PropTypes.bool }),
  canUnfavorite: PropTypes.shape({ value: PropTypes.bool }),
  favoritesCount: PropTypes.number,
  onFavorite: PropTypes.func.isRequired,
  onUnfavorite: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  viewerDidFavorite: PropTypes.bool,
};
