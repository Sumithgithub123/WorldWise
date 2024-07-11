import { Link, NavLink } from "react-router-dom";
import styles from "./Pagenav.module.css";
import Logo from "./Logo";

function Pagenav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink className={styles.ctaLink} to={"/login"}>Login</NavLink>
          {/* <Link to={"/login"}>Login</Link> */}
        </li>
      </ul>
    </nav>
  );
}

export default Pagenav;
