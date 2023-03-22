import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { FormikStatusErrors } from '../formik-status-errors';
import { FormikSubmitButton } from '../formik-submit-button';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  input: Yup.object({
    username: Yup.string().label('Username').required(),
    email: Yup.string().label('Email').required().email(),
    password: Yup.string().label('Password').required(),
  }),
});

export function RegisterForm({ onSubmit }) {
  return (
    <div className="max-w-6xl mx-auto px-4 page">
      <div className="grid grid-cols-12">
        <div className="md:col-span-6 md:col-start-4 md:col-end-10 col-span-12">
          <h1 className="text-center">Sign up</h1>
          <p className="text-center">
            <Link href="/login">
              <a>Have an account?</a>
            </Link>
          </p>
          <Formik
            validationSchema={validationSchema}
            initialStatus={[]}
            initialValues={{
              input: { email: '', username: '', password: '' },
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <ul className="text-[#b85c5c] font-bold">
                <ErrorMessage component="li" name="input.username" />
                <ErrorMessage component="li" name="input.email" />
                <ErrorMessage component="li" name="input.password" />
                <FormikStatusErrors />
              </ul>
              <fieldset className="mb-4">
                <label>Username</label>
                <Field
                  className="tw-form-control tw-form-control-lg"
                  type="text"
                  name="input.username"
                  placeholder="john.doe"
                  autoComplete="username"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label>Email</label>
                <Field
                  className="tw-form-control tw-form-control-lg"
                  type="email"
                  name="input.email"
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label>Password</label>
                <Field
                  className="tw-form-control tw-form-control-lg"
                  type="password"
                  name="input.password"
                  placeholder="A secure password"
                  autoComplete="new-password"
                />
              </fieldset>
              <FormikSubmitButton className="tw-btn tw-btn-lg tw-btn-primary float-right">
                Sign up
              </FormikSubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
