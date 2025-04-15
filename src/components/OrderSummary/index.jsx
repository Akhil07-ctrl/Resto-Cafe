import './styles.css';

export default function OrderSummary({ cartItems, total, orderDetails, onDetailsChange, onSubmit }) {
  return (
    <div className="order-summary">
      <div className="summary-section">
        <h3>Order Items</h3>
        <ul className="summary-items">
          {cartItems.map(item => (
            <li key={item.dish_id} className="summary-item">
              <div className="item-details">
                <span className="item-name">{item.dish_name}</span>
                <span className="item-quantity">x{item.quantity}</span>
              </div>
              <span className="item-price">
                {item.dish_currency} {(parseFloat(item.dish_price) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="summary-total">
          <span>Total</span>
          <span>{cartItems[0]?.dish_currency || 'INR'} {total}</span>
        </div>
      </div>

      <form className="delivery-form" onSubmit={onSubmit}>
        <h3>Delivery Details</h3>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={orderDetails.name}
            onChange={onDetailsChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={orderDetails.email}
            onChange={onDetailsChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={orderDetails.phone}
            onChange={onDetailsChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={onDetailsChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Delivery Option</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={orderDetails.deliveryOption === 'delivery'}
                onChange={onDetailsChange}
              />
              Home Delivery
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="deliveryOption"
                value="pickup"
                checked={orderDetails.deliveryOption === 'pickup'}
                onChange={onDetailsChange}
              />
              Self Pickup
            </label>
          </div>
        </div>
        
        <button type="submit" className="proceed-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}