import { menu_list } from "../../assets/assets.js";
import "./menu.css";

export default function Menu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>

      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed fugit
        placeat enim dolorem ea alias quidem adipisci accusantium debitis ullam?
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "all" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
