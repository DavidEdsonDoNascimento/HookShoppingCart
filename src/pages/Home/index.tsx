import { useState, useEffect } from 'react';
import { ProductList } from './styles';
import { api } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import { ProductFormatted } from '../../types/Product';
import { Product } from '../../components/Product';
import { formatPrice } from '../../util/format';

interface CartItemsAmount {
  [key: number]: number;
}

type sampleProps = {
  products: any[];
  stock: any[];
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)



  const loadProducts = async () => {

    const storagedCart = localStorage.getItem('@RocketShoes:cart');
    if (storagedCart) {
      const productsJSON = JSON.parse(storagedCart) as sampleProps;
      const formattedProducts = productsJSON.products.map(item => ({ ...item, priceFormatted: formatPrice(item.price) }));
      setProducts(formattedProducts);
      return;
    }

    const products = await api('products');
    const stock = await api('stock');

    const cartData = {
      products: products.data,
      stock: stock.data
    };

    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cartData));

  }
  useEffect(() => {
    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map(item => (<Product product={item} handleAddProduct={handleAddProduct}></Product>))}
    </ProductList>
  );
};

export default Home;
