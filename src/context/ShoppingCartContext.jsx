import { useLocalStorage } from "components/ShoppingCart/hooks/useLocalStorage";
import { createContext, useContext, useState, ReactNode } from "react";
import ShoppingCartModal from "components/ShoppingCart/ShoppingCartModal";

ShoppingCartProvider.propTypes = {
  children: ReactNode,
};
const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const [itemCart, setItemCart] = useState("");

  const valueProvide = {
    itemCart,
    setItemCart,
    openCart() {
      setIsOpen(true);
    },
    closeCart() {
      setIsOpen(false);
    },
    getItemQuantity() {},
    increaseCartQuantity(id, type, times) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [...currItems, { id, quantity: 1, type, times }];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1, times };
            } else {
              return item;
            }
          });
        }
      });
    },
    addMultiQuantity(id, qtt, times) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [...currItems, { id, quantity: Number(qtt), times }];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              if (typeof item.times != "undefined") {
                return { ...item, quantity: item.quantity + Number(qtt), times };
              } else {
                return { ...item, quantity: item.quantity + Number(qtt), times };
              }
            } else {
              return item;
            }
          });
        }
      });
    },
    changeQuantity(id, qtt) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Number(qtt) };
          } else {
            return item;
          }
        });
      });
    },
    changeDate(id, times) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, times };
          } else {
            return item;
          }
        });
      });
    },
    decreaseCartQuantity(id) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id)?.quantity === 1) {
          return currItems.filter((item) => item.id !== id);
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    },
    SetPrice(id, pri) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, price: Number(pri) };
          } else {
            return item;
          }
        });
      });
    },
    removeFromCart(id) {
      setCartItems((currItems) => {
        return currItems.filter((item) => item.id !== id);
      });
    },
    cartQuantity,
    cartItems,
  };
  return (
    <ShoppingCartContext.Provider value={valueProvide}>
      {children}
      <ShoppingCartModal isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
