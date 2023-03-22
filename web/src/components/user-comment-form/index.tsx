import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormikSubmitButton } from '../formik-submit-button';
import { FormikStatusErrors } from '../formik-status-errors';
import * as Yup from 'yup';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Image from 'next/image';

const validationSchema = Yup.object({
  body: Yup.string().label('Body').required(),
});

export function UserCommentForm({
  onSubmit,
  username,
  profile,
  canCreateComment,
}) {
  if (canCreateComment.value === false) return null;

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={{ body: '' }}
      onSubmit={onSubmit}
    >
      <Form>
        <ul className="text-[#b85c5c] font-bold">
          <ErrorMessage component="li" name="body" />
          <FormikStatusErrors />
        </ul>
        <div className="tw-card">
          <div className="p-0">
            <Field
              name="body"
              as="textarea"
              className="tw-form-control tw-form-control-card p-5"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="tw-card-footer">
            <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
              <Image
                alt={`Image of ${username}`}
                className="tw-comment-author-img"
                height="32"
                src={profile.imageUrl ?? '/images/smiley-cyrus.jpg'}
                unoptimized={!!profile.imageUrl}
                width="32"
              />
            </span>
            &nbsp;&nbsp;
            <Link href="/user/[username]" as={`/user/${username}`}>
              <a className="tw-comment-author">{username}</a>
            </Link>
            <FormikSubmitButton className="tw-btn tw-btn-sm tw-btn-primary float-right font-bold">
              Post Comment
            </FormikSubmitButton>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

UserCommentForm.fragments = {
  article: gql`
    fragment UserCommentFormArticleFragment on Article {
      canCreateComment {
        value
      }
    }
  `,
  user: gql`
    fragment UserCommentFormUserFragment on User {
      username
      profile {
        imageUrl
      }
    }
  `,
};

UserCommentForm.defaultProps = {
  profile: {},
  canCreateComment: { value: false },
};

UserCommentForm.propTypes = {
  canCreateComment: PropTypes.shape({ value: PropTypes.bool }),
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({ imageUrl: PropTypes.string }),
  username: (
    props,
    rest: {
      propName: string;
      componentName: string;
      location: string;
      propFullName: string;
    }
  ) =>
    props.canCreateComment.value
      ? PropTypes.string.isRequired(
          props,
          rest.propName,
          rest.componentName,
          rest.location,
          rest.propFullName
        )
      : PropTypes.string(
          props,
          rest.propName,
          rest.componentName,
          rest.location,
          rest.propFullName
        ),
};
