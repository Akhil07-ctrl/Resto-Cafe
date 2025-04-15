import { useState, useEffect } from "react"
import { useCart } from "../../context/CartContext"
import "./styles.css"

export default function TabItems(props) {
    const { tableMenuList = [] } = props
    const [activeTab, setActiveTab] = useState("")
    const { addToCart } = useCart();
    
    useEffect(() => {
        if (tableMenuList.length > 0) {
            setActiveTab(tableMenuList[0].menu_category_id);
        }
    }, [tableMenuList]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId)
    }

    if (tableMenuList.length === 0) {
        return (
            <div className="tab-container">
                <div className="no-menu-message">
                    <p>No menu categories available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tab-container">
            <ul className="tab-list">
                {tableMenuList.map(menuCategory => (
                    <li 
                        key={menuCategory.menu_category_id}
                        className={`tab-item ${activeTab === menuCategory.menu_category_id ? 'active' : ''}`}
                        onClick={() => handleTabClick(menuCategory.menu_category_id)}
                    >
                        {menuCategory.menu_category}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tableMenuList.map(menuCategory => (
                    activeTab === menuCategory.menu_category_id && (
                        <div key={menuCategory.menu_category_id} className="category-dishes">
                            <h2>{menuCategory.menu_category}</h2>
                            <ul className="dishes-list">
                                {menuCategory.category_dishes.map(dish => (
                                    <li key={dish.dish_id} className="dish-item">
                                        <div className="dish-info">
                                            <h3>{dish.dish_name}</h3>
                                            <p>{dish.dish_currency} {dish.dish_price}</p>
                                            <p>{dish.dish_description}</p>
                                            <p>Calories: {dish.dish_calories}</p>
                                            <button 
                                                className="add-to-cart-btn"
                                                onClick={() => addToCart(dish)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        {dish.dish_image && (
                                            <div className="dish-image">
                                                <img src={dish.dish_image} alt={dish.dish_name} />
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}