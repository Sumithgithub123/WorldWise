// import { useEffect } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/FakeAuthContext";
import User from "../components/User";

function AppLayout() {
  // const { isauthenticated } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isauthenticated) navigate("/login");
  // }, [isauthenticated, navigate]);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
