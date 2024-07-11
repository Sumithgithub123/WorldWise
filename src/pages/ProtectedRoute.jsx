/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isauthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isauthenticated) {
      navigate("/login");
    }
  }, [isauthenticated, navigate]);

  if (!isauthenticated) return null;
  return children;
}

export default ProtectedRoute;
