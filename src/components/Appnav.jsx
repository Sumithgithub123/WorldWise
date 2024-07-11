import styles from "./Appnav.module.css";
import { NavLink } from "react-router-dom";

function Appnav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"/app/countries"}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Appnav;
