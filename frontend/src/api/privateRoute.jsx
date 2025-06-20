import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SignInModal from "../components/SignInModal";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [modalOpen, setModalOpen] = useState(true);

  if (!isAuthenticated) {
    return <SignInModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />;
  }

  return <Outlet />;
};

export default PrivateRoute;