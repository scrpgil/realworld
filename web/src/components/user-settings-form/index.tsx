import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormikSubmitButton } from '../formik-submit-button';
import { FormikStatusErrors } from '../formik-status-errors';
import * as Yup from 'yup';
import { gql } from '@apollo/client';

const validationSchema = Yup.object({
  username: Yup.string().required('You need to be logged in to do this'),
  input: Yup.object({
    email: Yup.string().label('Email').email().required(),
    password: Yup.string().label('Password'),
    username: Yup.string().label('Username').required(),
    profile: Yup.object({
      bio: Yup.string().label('Bio'),
      imageUrl: Yup.string().label('Image Url'),
    }),
  }),
});

export function UserSettingsForm({ onSubmit, username, email, profile }) {
  const { bio = '', imageUrl } = profile;
  return (
    <div className="max-w-6xl mx-auto px-4 page">
      <div className="grid grid-cols-12">
        <div className="md:col-span-6 md:col-start-4 md:col-end-10 col-span-12">
          <h1 className="text-center">Your Settings</h1>
          <Formik
            validationSchema={validationSchema}
            initialStatus={[]}
            enableReinitialize
            initialValues={{
              username,
              input: {
                email,
                password: '',
                username,
                profile: {
                  bio,
                  imageUrl: imageUrl ?? '',
                },
              },
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <ul className="text-[#b85c5c] font-bold">
                <ErrorMessage component="li" name="username" />
                <ErrorMessage component="li" name="input.email" />
                <ErrorMessage component="li" name="input.password" />
                <ErrorMessage component="li" name="input.username" />
                <ErrorMessage component="li" name="input.profile.bio" />
                <ErrorMessage component="li" name="input.profile.imageUrl" />
                <FormikStatusErrors />
              </ul>
              <fieldset>
                <fieldset className="mb-4">
                  <label>Email</label>
                  <Field
                    name="input.email"
                    className="tw-form-control tw-form-control-lg"
                    type="email"
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <label>Password</label>
                  <Field
                    name="input.password"
                    className="tw-form-control tw-form-control-lg"
                    type="password"
                    placeholder="A secure password"
                    autoComplete="new-password"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <label>Username</label>
                  <Field
                    name="input.username"
                    className="tw-form-control tw-form-control-lg"
                    type="text"
                    placeholder="john.doe"
                    autoComplete="username"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <label>Bio</label>
                  <Field
                    name="input.profile.bio"
                    as="textarea"
                    className="tw-form-control tw-form-control-lg"
                    rows={8}
                    placeholder="John Doe is a Loan Officer at XYZ Bank, where John processes loan applications from start to finish, including mortgage refinancing and educating clients about their different financing options. John has worked with reputable real estate agencies, including ReMax, Century 21, and Coldwell Banker, among others. John helps homeowners and new buyers secure a loan that suits their budget and goals. You can expect 100% transparency, no horror stories, and nasty surprises when working with John. John is a cat-lover and CMAS diver from Michigan."
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <label>Image Url</label>
                  <Field
                    name="input.profile.imageUrl"
                    className="tw-form-control tw-form-control-base"
                    type="text"
                    placeholder="http://example.com/your-photo.jpg"
                  />
                </fieldset>
                <FormikSubmitButton className="tw-btn tw-btn-lg tw-btn-primary float-right">
                  Update Settings
                </FormikSubmitButton>
              </fieldset>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

UserSettingsForm.fragments = {
  user: gql`
    fragment UserSettingsFormUserFragment on User {
      username
      email
      profile {
        bio
        imageUrl
      }
    }
  `,
};

UserSettingsForm.defaultProps = {
  profile: {},
};

UserSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    bio: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};
