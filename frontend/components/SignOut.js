import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
}
