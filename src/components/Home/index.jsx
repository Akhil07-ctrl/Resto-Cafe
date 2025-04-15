import {Component} from 'react'
import NavBar from '../NavBar'
import TabItems from '../TabItems'

import './styles.css'

class Home extends Component {
  state = {
    restaurantData: null, 
    tableMenuList: [],
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchRestaurantData();
  }

  fetchRestaurantData = () => {
    const url = "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details";
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const restaurantData = data[0];
          this.setState({
            restaurantData,
            isLoading: false, 
            tableMenuList: restaurantData.table_menu_list,
          });
        } else {
          this.setState({
            error: "No restaurant data available",
            isLoading: false,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
        this.setState({
          error: "An error occurred while fetching the restaurant data.",
          isLoading: false,
        });
      });
  }
  
  render() {
    const { restaurantData, tableMenuList, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="loading-container">
          <p>Loading restaurant data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={this.fetchRestaurantData}>Retry</button>
        </div>
      );
    }

    return (
      <div className="home-container">
        <NavBar />
        {restaurantData && (
          <div className="restaurant-header">
            <h1>{restaurantData.restaurant_name}</h1>
            {restaurantData.restaurant_image && (
              <img 
                src={restaurantData.restaurant_image} 
                alt={restaurantData.restaurant_name}
                className="restaurant-image"
              />
            )}
          </div>
        )}
        <TabItems tableMenuList={tableMenuList} />
      </div>
    );
  }
}

export default Home
