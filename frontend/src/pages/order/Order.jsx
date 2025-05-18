import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./order.css";

const Order = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // State to hold the order data
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Function to handle input changes
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  };

  // Function to handle form submission
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Something went wrong");
    }
  };

  // Check if the user is logged in and has items in the cart
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zipcode"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
