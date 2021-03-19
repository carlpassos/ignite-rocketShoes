import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { convertToObject } from 'typescript';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  })

  console.log(cart);

  const addProduct = async (productId: number) => {
    try {
      api.get(`/stock/?id=${productId}`).then(response => {
        api.get(`/products/?id=${response.data.id}`).then(response => {
          if (cart) {
            const filteredCart = cart.filter(product => product.id === productId);
            console.log(filteredCart);
          
          if (filteredCart === []) {
            const amount = filteredCart[0] ? filteredCart[0].amount + 1 : 1;
            updateProductAmount({ productId, amount });
            return
          }
        }
        console.log(cart);

          const newCart = cart;

          newCart.push(response.data);
          console.log(newCart);
          // localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
        })
      }) 
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
