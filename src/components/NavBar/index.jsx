import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import Cart from '../Cart';
import './styles.css';

export default function NavBar() {
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [showCart, setShowCart] = useState(false);
  
  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };
  
  return (
    <>
      <nav className="nav-bar">
        <h1>UNI Resto Cafe</h1>
        <div className="nav-bar-right">
          <h3 className="my-orders">My Orders</h3>
          <button 
            type="button" 
            className="theme-toggle-button" 
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          <button 
            type="button" 
            className="cart-button" 
            aria-label="Shopping cart"
            onClick={toggleCart}
          >
            <AiOutlineShoppingCart />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </button>
        </div>
      </nav>
      
      <Cart isOpen={showCart} onClose={toggleCart} />
    </>
  );
}
