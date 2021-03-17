import Head from 'next/head';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  // [function to be called, {data: retunr data, error: any errors, loading: if loading}]
  const [signUp, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await signUp();
    resetForm();
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Head>
        <title>Sick Fits - Password Reset!</title>
      </Head>
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            If we have this email account we will send instructions to your
            inbox!
          </p>
        )}
        <h2>Request a password reset</h2>
        <DisplayError error={error} />

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

        <button tpye="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
