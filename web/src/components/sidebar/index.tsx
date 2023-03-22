import React from 'react';
import PropTypes from 'prop-types';
import { SidebarTagList } from './tag-list';
import { gql } from '@apollo/client';

export function Sidebar({ popularTags }) {
  return (
    <div className="sidebar rounded pt-[5px] pb-2.5 px-2.5 bg-[#f3f3f3]">
      <p>Popular Tags</p>
      <SidebarTagList popularTags={popularTags} />
    </div>
  );
}

Sidebar.fragments = {
  query: gql`
    fragment SidebarQueryFragment on Query {
      popularTags {
        ...SidebarTagListTagFragment
      }
    }
    ${SidebarTagList.fragments.tag}
  `,
};

Sidebar.defaultProps = {
  popularTags: [],
};

Sidebar.propTypes = {
  popularTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
