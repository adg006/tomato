import { assets } from "../../assets/assets";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" />
      <img src={assets.profile_image} className="profile" />
    </div>
  );
};

export default Navbar;
