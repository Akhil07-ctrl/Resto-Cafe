import { useState } from 'react';
import './styles.css';

export default function PaymentForm({ amount, currency, onPaymentSuccess, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCardDetails = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Card name validation
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Please enter the name on card';
    }
    
    // Expiry date validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = cardDetails.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // CVV validation (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpi = () => {
    const newErrors = {};
    
    // Basic UPI ID validation
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = false;
    
    if (paymentMethod === 'card') {
      isValid = validateCardDetails();
    } else if (paymentMethod === 'upi') {
      isValid = validateUpi();
    } else if (paymentMethod === 'cod') {
      isValid = true; // No validation needed for COD
    }
    
    if (isValid) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess({
          method: paymentMethod,
          amount,
          currency,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-amount">
        <h3>Payment Amount</h3>
        <div className="amount">{currency} {amount}</div>
      </div>
      
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div className="method-options">
          <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <div className="method-icon card-icon">💳</div>
            <span>Credit/Debit Card</span>
          </label>
          
          <label className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
            />
            <div className="method-icon upi-icon">📱</div>
            <span>UPI</span>
          </label>
          
          <label className={`method-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            <div className="method-icon cod-icon">💵</div>
            <span>Cash on Delivery</span>
          </label>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="payment-details-form">
        {paymentMethod === 'card' && (
          <div className="card-details">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                maxLength="19"
              />
              {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={cardDetails.cardName}
                onChange={handleCardDetailsChange}
              />
              {errors.cardName && <div className="error-message">{errors.cardName}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  maxLength="5"
                />
                {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  maxLength="4"
                />
                {errors.cvv && <div className="error-message">{errors.cvv}</div>}
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'upi' && (
          <div className="upi-details">
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                id="upiId"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              {errors.upiId && <div className="error-message">{errors.upiId}</div>}
            </div>
          </div>
        )}
        
        {paymentMethod === 'cod' && (
          <div className="cod-details">
            <p className="cod-message">
              You have selected Cash on Delivery. Please keep exact change ready at the time of delivery.
            </p>
          </div>
        )}
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Back
          </button>
          <button type="submit" className="pay-btn" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay ${currency} ${amount}`}
          </button>
        </div>
      </form>
    </div>
  );
}