import { useContext } from "react";

import Item from "../items/Item";

import { StoreContext } from "../../context/StoreContext";

import "./listing.css";

const Listing = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {(food_list || []).map((item, index) => {
          if (category === "all" || category === item.category) {
            return (
              <Item
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Listing;
