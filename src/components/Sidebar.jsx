import styles from "./Sidebar.module.css";
import Appnav from "./Appnav";
import Logo from "./Logo";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Appnav />
      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
