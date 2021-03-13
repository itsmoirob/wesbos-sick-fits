import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will deal with all
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read the number of items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const totalPages = Math.ceil(count / first);

      // check if we have existing items.
      // .filter(x => x) filters undefined
      const items = existing.slice(skip, skip + first).filter((x) => x);

      /**
       * IF
       * * there are items
       * * AND there arent enough items to stasify how many requested
       * * AND we are on the last page
       * send items
       */
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      // If cached items does not match number of items need go get some.
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false; // fallback is to fetch data
    },
    merge(existing, incoming, { args }) {
      // this is what happens when apollo returns from network
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      /**
       * becuase someone may go direct to "/products/3" we cant put merged at front of array
       * we will need to fill in some empty spaces first
       */
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
