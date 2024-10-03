import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoggedInRoute({ children }) {
	const { auth, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	if (auth) return children;

	return <Navigate to="/login" replace />;
}
