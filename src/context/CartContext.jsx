import { createContext, useContext, useState, useEffect } from 'react';
import Notification from '../components/Notification';

const CartContext = createContext();

// Helper function to get cart items from localStorage
const getLocalCartItems = () => {
  const localCartItems = localStorage.getItem('cartItems');
  return localCartItems ? JSON.parse(localCartItems) : [];
};

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false
  });
  
  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Function to show notification
  const showNotification = (message) => {
    setNotification({
      message,
      isVisible: true
    });
  };
  
  // Function to hide notification
  const hideNotification = () => {
    setNotification({
      ...notification,
      isVisible: false
    });
  };

  // Add item to cart
  const addToCart = (dish) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.dish_id === dish.dish_id);
      
      if (existingItem) {
        // Increase quantity if item exists
        showNotification(`Added another ${dish.dish_name} to cart`);
        return prevItems.map(item => 
          item.dish_id === dish.dish_id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        showNotification(`${dish.dish_name} added to cart`);
        return [...prevItems, { ...dish, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (dishId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.dish_id !== dishId)
    );
  };

  // Update item quantity
  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.dish_id === dishId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (parseFloat(item.dish_price) * item.quantity), 0
    ).toFixed(2);
  };
  
  // Debug function to check if localStorage is working
  const isLocalStorageWorking = () => {
    return localStorage.getItem('cartItems') !== null;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isLocalStorageWorking
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Notification 
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </CartContext.Provider>
  );
}