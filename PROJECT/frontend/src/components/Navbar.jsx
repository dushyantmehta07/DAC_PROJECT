import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">ShopHub</h2>

      <ul className="menu">
        <li>
          Fashion
          <ul className="dropdown">
            <li><Link to="/fashion/women">Women</Link></li>
            <li><Link to="/fashion/men">Men</Link></li>
            <li><Link to="/fashion/kids">Kids</Link></li>
          </ul>
        </li>

        <li>
          Electronics
          <ul className="dropdown">
            <li><Link to="/electronics/mobiles">Mobiles</Link></li>
            <li><Link to="/electronics/laptops">Laptops</Link></li>
          </ul>
        </li>

        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
