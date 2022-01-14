import { MdAddShoppingCart } from "react-icons/md"
import { ProductFormatted } from "../../types/Product"

type productProps = {
    product: ProductFormatted;
    handleAddProduct: (id: number) => void;
}

export const Product = ({ product, handleAddProduct }: productProps) => {
    return (
        <li>
            <img src={product.image || ''} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(product.id)}
            >
                <div data-testid="cart-product-quantity">
                    <MdAddShoppingCart size={16} color="#FFF" />
                    {/* {cartItemsAmount[product.id] || 0} */} {product.id ? 1 : 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
            </button>
        </li>
    )
}