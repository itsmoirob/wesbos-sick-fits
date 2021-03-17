import Head from 'next/head';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  // [function to be called, {data: retunr data, error: any errors, loading: if loading}]
  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await resetPassword();
    resetForm();
  }

  const errorBeforeRequest = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Head>
        <title>Sick Fits - Password Reset!</title>
      </Head>
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Your password has been changed.</p>
        )}
        <h2>Reset your password</h2>
        <DisplayError error={error || errorBeforeRequest} />

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Use strong password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button tpye="submit">Reset!</button>
      </fieldset>
    </Form>
  );
}
