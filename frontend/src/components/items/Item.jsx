import { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./item.css";

const Item = ({ id, name, price, description, image }) => {
  const { url, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={`${url}/images/${image}`}
          alt="food image"
          className="food-item-image"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Item;
