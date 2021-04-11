import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';

import { CartItemCreateInput } from '../.keystone/schema-types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // is current user logged in?
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this');
  }

  // query current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // if item is i cart then increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  // if item is not in cart then add it.
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
