import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { gql } from '@apollo/client';

export function UserFollowButton({
  canFollow,
  canUnfollow,
  followersCount,
  onFollow,
  onUnfollow,
  username,
  viewerIsFollowing,
}) {
  const disabled = !(canFollow.value || canUnfollow.value);
  const handleClick = event => {
    event.preventDefault();
    if (viewerIsFollowing) {
      onUnfollow({ variables: { username } });
    } else {
      onFollow({ variables: { username } });
    }
  };

  return (
    <button
      className={clsx('tw-btn tw-btn-sm', {
        'tw-btn-outline-secondary': viewerIsFollowing === false,
        'tw-btn-secondary': viewerIsFollowing,
        'cursor-pointer': canFollow.value || canUnfollow.value,
        'cursor-not-allowed': !(canFollow.value || canUnfollow.value),
      })}
      disabled={disabled}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />{' '}
      {viewerIsFollowing ? 'Unfollow' : 'Follow'} {username} ({followersCount})
    </button>
  );
}

UserFollowButton.fragments = {
  user: gql`
    fragment UserFollowButtonUserFragment on User {
      canFollow {
        value
      }
      canUnfollow {
        value
      }
      followersCount
      username
      viewerIsFollowing
    }
  `,
};

UserFollowButton.defaultProps = {
  followersCount: 0,
  viewerIsFollowing: false,
  canFollow: { value: false },
  canUnfollow: { value: false },
};

UserFollowButton.propTypes = {
  canFollow: PropTypes.shape({ value: PropTypes.bool }),
  canUnfollow: PropTypes.shape({ value: PropTypes.bool }),
  followersCount: PropTypes.number,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  viewerIsFollowing: PropTypes.bool,
};
