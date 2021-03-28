import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import styled from 'styled-components';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  boder-bottom: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.price)}
          </em>{' '}
          each
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();

  if (!me) return null;

  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}