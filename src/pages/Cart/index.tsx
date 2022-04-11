import { useCart } from '../../hooks/useCart';
import { CartTable } from '../CartTable';

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  return (
    <CartTable
      cart={cart}
      removeProduct={removeProduct}
      updateProductAmount={updateProductAmount}
    />
  );
};

export default Cart;
