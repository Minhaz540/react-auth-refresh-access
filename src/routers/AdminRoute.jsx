import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
	const { auth, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	if (auth && auth.role === "admin") return children;

	return <Navigate to="/" replace />;
}
