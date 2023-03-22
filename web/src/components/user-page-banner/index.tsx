import React from 'react';
import PropTypes from 'prop-types';
import { UserFollowButton } from '../user-follow-button';
import { UserUpdateButton } from '../user-update-button';
import { UserAvatar } from '../user-avatar';
import { gql } from '@apollo/client';

export function UserPageBanner({
  canFollow,
  canUnfollow,
  canUpdate,
  followersCount,
  onFollow,
  onUnfollow,
  profile,
  username,
  viewerIsFollowing,
}) {
  return (
    <div className="text-center pt-8 pb-4 px-0 bg-[#f3f3f3]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 md:col-end-10 col-span-12">
            <UserAvatar size="128" username={username} profile={profile} />
            <h4 className="my-2">{username}</h4>
            <p className="text-[#aaa] max-w-[450px] font-light mt-0 mb-2 mx-auto">
              {profile.bio}
            </p>
            <div className="ml-[-5px]">
              <UserFollowButton
                canFollow={canFollow}
                canUnfollow={canUnfollow}
                followersCount={followersCount}
                onFollow={onFollow}
                onUnfollow={onUnfollow}
                username={username}
                viewerIsFollowing={viewerIsFollowing}
              />
              <UserUpdateButton canUpdate={canUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserPageBanner.fragments = {
  user: gql`
    fragment UserPageBannerUserFragment on User {
      username
      profile {
        bio
      }
      ...UserAvatarUserFragment
      ...UserFollowButtonUserFragment
      ...UserUpdateButtonUserFragment
    }
    ${UserAvatar.fragments.user}
    ${UserFollowButton.fragments.user}
    ${UserUpdateButton.fragments.user}
  `,
};

UserPageBanner.defaultProps = {
  profile: {},
};

UserPageBanner.propTypes = {
  canFollow: PropTypes.object,
  canUnfollow: PropTypes.object,
  canUpdate: PropTypes.object,
  followersCount: PropTypes.number,
  profile: PropTypes.shape({
    bio: PropTypes.string,
  }),
  username: PropTypes.string.isRequired,
  viewerIsFollowing: PropTypes.bool,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};
