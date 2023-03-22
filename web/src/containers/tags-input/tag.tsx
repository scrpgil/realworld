import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery, NetworkStatus } from '@apollo/client';

export function TagsInputTag({ id, onRemoveTag }) {
  const tagInputTag = useQuery(TagsInputTagQuery, {
    variables: {
      id,
    },
  });

  if (tagInputTag.networkStatus === NetworkStatus.loading) return null;

  return (
    <span className="text-white text-[0.8rem] whitespace-nowrap inline-block bg-[#818a91] mr-[3px] mb-[0.2rem] py-[0.1rem] px-[0.6em] rounded-[10rem]">
      <i
        className="ion-close-round"
        onClick={() => onRemoveTag(tagInputTag.data.tag)}
      />
      {tagInputTag.data.tag.name}
    </span>
  );
}

TagsInputTag.propTypes = {
  id: PropTypes.string.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

TagsInputTag.fragments = {
  tag: gql`
    fragment TagsInputTagTagFragment on Tag {
      id
      name
    }
  `,
};

const TagsInputTagQuery = gql`
  query TagsInputTagQuery($id: ID!) {
    tag(id: $id) {
      ...TagsInputTagTagFragment
    }
  }
  ${TagsInputTag.fragments.tag}
`;
