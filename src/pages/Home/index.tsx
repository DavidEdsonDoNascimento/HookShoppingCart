import { useState, useEffect } from 'react';
import { ProductList } from './styles';
import { api } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import { ProductFormatted } from '../../types/Product';
import { Product as TagProduct } from '../../components/Product';
import { Product } from '../../types/Product';
import { formatPrice } from '../../util/format';

export interface CartItemsAmount {
  [key: number]: number;
}

type sampleProps = {
  products: any[];
  stock: any[];
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;
    return newSumAmount;
  }, {} as CartItemsAmount)

  const loadProducts = async () => {

    const response = await api.get<Product[]>('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }));

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map(product => (<TagProduct key={product.id} product={product} handleAddProduct={handleAddProduct} cartItemsAmount={cartItemsAmount}></TagProduct>))}
    </ProductList>
  );
};

export default Home;
