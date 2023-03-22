import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { UserCommentForm } from '../../components/user-comment-form';
import { handleValidationError } from '../../utils/graphql';
import { CommentCard } from '../../components/comment-card';

export function ArticleComments({ articleSlug }) {
  const component = useQuery(ArticleCommentsQuery, {
    variables: {
      slug: articleSlug,
    },
  });

  const [deleteComment] = useMutation(ArticleCommentsDeleteCommentMutation, {
    update(proxy, mutationResult) {
      const commentsList: any = proxy.readQuery({
        query: ArticleCommentsQuery,
        variables: { slug: articleSlug },
      });

      proxy.writeQuery({
        query: ArticleCommentsQuery,
        variables: { slug: articleSlug },
        data: {
          ...Object.assign({}, commentsList),
          article: {
            ...commentsList.article,
            slug: articleSlug,
            comments: [
              ...commentsList.article.comments.filter(
                comment =>
                  comment.id !== mutationResult.data.deleteComment.comment.id
              ),
            ],
          },
        },
      });
    },
  });

  const [createComment] = useMutation(ArticleCommentsCreateCommentMutation, {
    update(proxy, mutationResult) {
      const commentsList: any = proxy.readQuery({
        query: ArticleCommentsQuery,
        variables: { slug: articleSlug },
      });

      try {
        proxy.writeQuery({
          query: ArticleCommentsQuery,
          variables: { slug: articleSlug },
          data: {
            ...commentsList,
            article: {
              ...commentsList.article,
              slug: articleSlug,
              comments: [
                mutationResult.data.createComment.comment,
                ...commentsList.article.comments,
              ],
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleSubmit = (input, { setSubmitting, setStatus, resetForm }) => {
    try {
      createComment({
        variables: {
          articleSlug,
          input,
        },
      })
        .then(() => {
          try {
            resetForm();
          } catch (e) {
            console.log(e);
          }
        })
        .catch(err => {
          try {
            handleValidationError(err, setStatus);
            console.error(err);
          } catch (e) {
            console.log(e);
          }
        })
        .finally(() => setSubmitting(false));
    } catch (e) {
      console.log(e);
    }
  };

  if (component.networkStatus === NetworkStatus.loading) {
    return null;
  }

  return (
    <>
      <UserCommentForm
        canCreateComment={component.data.article.canCreateComment}
        onSubmit={handleSubmit}
        {...component.data.viewer}
      />
      {component.data.article.comments.map(comment => (
        <CommentCard key={comment.id} onDelete={deleteComment} {...comment} />
      ))}
    </>
  );
}

ArticleComments.propTypes = {
  articleSlug: PropTypes.string.isRequired,
};

ArticleComments.fragments = {
  viewer: gql`
    fragment ArticleCommentsViewerFragment on User {
      ...UserCommentFormUserFragment
    }
    ${UserCommentForm.fragments.user}
  `,
  article: gql`
    fragment ArticleCommentsArticleFragment on Article {
      ...UserCommentFormArticleFragment
      comments {
        ...CommentCardCommentFragment
      }
    }
    ${UserCommentForm.fragments.article}
    ${CommentCard.fragments.comment}
  `,
};

export const ArticleCommentsQuery = gql`
  query ArticleCommentsQuery($slug: ID!) {
    viewer {
      ...ArticleCommentsViewerFragment
    }
    article: articleBySlug(slug: $slug) {
      ...ArticleCommentsArticleFragment
    }
  }
  ${ArticleComments.fragments.viewer}
  ${ArticleComments.fragments.article}
`;

export const ArticleCommentsCreateCommentMutation = gql`
  mutation ArticleCommentsCreateCommentMutation(
    $articleSlug: ID!
    $input: CreateCommentInput!
  ) {
    createComment(articleSlug: $articleSlug, input: $input) {
      comment {
        ...CommentCardCommentFragment
      }
    }
  }
  ${CommentCard.fragments.comment}
`;

const ArticleCommentsDeleteCommentMutation = gql`
  mutation ArticleCommentsDeleteCommentMutation($id: ID!) {
    deleteComment(id: $id) {
      comment {
        ...CommentCardCommentFragment
      }
    }
  }
  ${CommentCard.fragments.comment}
`;

ArticleComments.query = ArticleCommentsQuery;
