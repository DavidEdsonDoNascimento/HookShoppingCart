import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import { formatPrice } from '../../util/format';
import { Container, ProductTable } from './styles';
import { ProductTableHeader } from '../ProductTableHeader';
import { UpdateProductAmount } from '../../hooks/useCart';
import { ProductTableFooter } from '../ProductTableFooter';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
}

type CartUtils = {
    cart: Product[],
    removeProduct: (productId: number) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}
export const CartTable = ({ cart, removeProduct, updateProductAmount }: CartUtils) => {

    const cartFormatted = cart.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        subTotal: formatPrice(product.price * product.amount)
    }));

    const total =
        formatPrice(
            cart.reduce((sumTotal, product) => {
                return sumTotal + product.price * product.amount;
            }, 0)
        )

    function handleProductIncrement(product: Product) {
        updateProductAmount({ productId: product.id, amount: product.amount + 1 });
    }

    function handleProductDecrement(product: Product) {
        updateProductAmount({ productId: product.id, amount: product.amount - 1 });
    }

    function handleRemoveProduct(productId: number) {
        removeProduct(productId);
    }

    return (
        <Container>
            <ProductTable>
                <ProductTableHeader />
                <tbody>
                    {cartFormatted.map(p => (
                        <tr key={p.id} data-testid="product">
                            <td>
                                <img src={p.image} alt={p.title} />
                            </td>
                            <td>
                                <strong>{p.title}</strong>
                                <span>{p.priceFormatted}</span>
                            </td>
                            <td>
                                <div>
                                    <button
                                        type="button"
                                        data-testid="decrement-product"
                                        disabled={p.amount <= 1}
                                        onClick={() => handleProductDecrement(p)}
                                    >
                                        <MdRemoveCircleOutline size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        data-testid="product-amount"
                                        readOnly
                                        value={p.amount}
                                    />
                                    <button
                                        type="button"
                                        data-testid="increment-product"
                                        onClick={() => handleProductIncrement(p)}
                                    >
                                        <MdAddCircleOutline size={20} />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>{p.subTotal}</strong>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    data-testid="remove-product"
                                    onClick={() => handleRemoveProduct(p.id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <ProductTableFooter total={total} />
        </Container>
    )
};