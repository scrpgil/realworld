import React from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import Image from 'next/image';

export function UserAvatar({ profile, username, size }) {
  return (
    <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <Image
        className="inline-block align-middle h-8 w-8 rounded-[30px]"
        alt={`Image of ${username}`}
        height={size}
        src={profile.imageUrl ?? '/images/smiley-cyrus.jpg'}
        unoptimized={!!profile.imageUrl}
        width={size}
      />
    </span>
  );
}

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatarUserFragment on User {
      username
      profile {
        imageUrl
      }
    }
  `,
};

UserAvatar.defaultProps = {
  profile: {},
};

UserAvatar.propTypes = {
  profile: PropTypes.shape({ imageUrl: PropTypes.string }),
  username: PropTypes.string.isRequired,
  size: PropTypes.string,
};
