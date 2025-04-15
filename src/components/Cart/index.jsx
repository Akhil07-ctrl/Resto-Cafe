import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Checkout from '../Checkout';
import './styles.css';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    onClose();
  };

  return (
    <>
      <div className="cart-overlay">
        <div className="cart-container">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item.dish_id} className="cart-item">
                    <div className="cart-item-info">
                      <h3>{item.dish_name}</h3>
                      <p>{item.dish_currency} {item.dish_price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button 
                        onClick={() => updateQuantity(item.dish_id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.dish_id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.dish_id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{cartItems[0]?.dish_currency} {getCartTotal()}</span>
                </div>
                <div className="cart-actions">
                  <button onClick={clearCart} className="clear-btn">Clear Cart</button>
                  <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showCheckout && <Checkout onClose={handleCloseCheckout} />}
    </>
  );
}