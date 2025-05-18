import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { food_list } from "../assets/assets.js";

export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState();

  const url = "http://localhost:4000";

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    }

    const loadData = async () => {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    };

    loadData();
  }, []);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo.price * cartItems[item];
      }
    }

    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}
