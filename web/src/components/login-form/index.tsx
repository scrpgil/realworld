import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { FormikStatusErrors } from '../formik-status-errors';
import { FormikSubmitButton } from '../formik-submit-button';
import Link from 'next/link';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  input: Yup.object({
    email: Yup.string().label('Email').email().required(),
    password: Yup.string().label('Password').required(),
  }),
});

export function LoginForm({ onSubmit }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-12">
        <div className="md:col-span-6 md:col-start-4 md:col-end-10 col-span-12">
          <h1 className="text-center">Sign in</h1>
          <p className="text-center">
            <Link href="/register">
              <a>Need an account?</a>
            </Link>
          </p>
          <Formik
            validationSchema={validationSchema}
            initialStatus={[]}
            initialValues={{ input: { email: '', password: '' } }}
            onSubmit={onSubmit}
          >
            <Form>
              <ul className="text-[#b85c5c] font-bold">
                <ErrorMessage component="li" name="input.email" />
                <ErrorMessage component="li" name="input.password" />
                <FormikStatusErrors />
              </ul>
              <fieldset className="mb-4">
                <label>Email</label>
                <Field
                  name="input.email"
                  className="tw-form-control tw-form-control-lg"
                  type="text"
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
                  placeholder="A strong password"
                  autoComplete="current-password"
                />
              </fieldset>
              <FormikSubmitButton className="tw-btn tw-btn-lg tw-btn-primary float-right">
                Sign in
              </FormikSubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
