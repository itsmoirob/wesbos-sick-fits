import UpdateProduct from '../components/UpdateProduct.js';

export default function UpdatePage({ query: { id } }) {
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
