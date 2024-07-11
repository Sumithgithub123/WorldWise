import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Pagenav from "../components/Pagenav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isauthenticated } = useAuth();

  function handlelogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isauthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isauthenticated, navigate]);

  return (
    <main className={styles.login}>
      <Pagenav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handlelogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
