import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from '../components/ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const {
    error: paginationError,
    loading: paginationLoading,
    data: paginationData,
  } = useQuery(PAGINATION_QUERY);

  if (paginationLoading) return 'Loading ...';
  if (paginationError) return <DisplayError error={error} />;

  const { count: itemCount } = paginationData._allProductsMeta;
  const pageCount = Math.ceil(itemCount / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${+page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{itemCount} Items Total</p>
      <Link href={`/products/${+page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
