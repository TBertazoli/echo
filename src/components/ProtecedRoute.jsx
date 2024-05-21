import { useNavigate } from "react-router-dom";
import { getUser } from "../utilities/users-service";

export default function ProtectedRoute({ children}) {
  const user = getUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }
  return children;
}
