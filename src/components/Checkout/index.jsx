import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PaymentForm from '../PaymentForm';
import OrderSummary from '../OrderSummary';
import './styles.css';

export default function Checkout({ onClose }) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState('summary'); // 'summary', 'payment', 'confirmation'
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
    deliveryOption: 'delivery'
  });
  const [orderId, setOrderId] = useState(null);

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // In a real app, you would send the order to your backend here
    // and get back an order ID
    const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    setStep('confirmation');
    
    // Clear the cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>
            {step === 'summary' && 'Checkout'}
            {step === 'payment' && 'Payment'}
            {step === 'confirmation' && 'Order Confirmed'}
          </h2>
          {step !== 'confirmation' && (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>

        <div className="checkout-content">
          {step === 'summary' && (
            <OrderSummary 
              cartItems={cartItems} 
              total={getCartTotal()} 
              orderDetails={orderDetails}
              onDetailsChange={handleDetailsChange}
              onSubmit={handleSubmitDetails}
            />
          )}

          {step === 'payment' && (
            <PaymentForm 
              amount={getCartTotal()} 
              currency={cartItems[0]?.dish_currency || 'INR'} 
              onPaymentSuccess={handlePaymentSuccess}
              onCancel={() => setStep('summary')}
            />
          )}

          {step === 'confirmation' && (
            <div className="order-confirmation">
              <div className="confirmation-icon">✓</div>
              <h3>Thank you for your order!</h3>
              <p>Your order has been confirmed.</p>
              <p className="order-id">Order ID: {orderId}</p>
              <p>You will receive an email confirmation shortly.</p>
              <button 
                className="continue-btn" 
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}