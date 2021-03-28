export default function calcTotalPrice(cart) {
  return cart.reduce((total, cartItem) => {
    if (!cartItem.product) return total;

    total += cartItem.product.price * cartItem.quantity;
  }, 0);
}
