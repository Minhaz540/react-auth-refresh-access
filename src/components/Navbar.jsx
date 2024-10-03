import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
	const { auth, logout } = useAuth();

	return (
		<nav className="flex items-center justify-between gap-4 p-4 border">
			<div className="flex gap-4">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/profile">Profile</NavLink>
				<NavLink to="/dashboard">Dashboard</NavLink>
			</div>

			{auth ? (
				<div className="flex items-center gap-3">
					<span>{auth?.fullName}</span>
					<img className="w-10 h-10 rounded-full" src={auth?.avatar} alt="" />
					<div className="cursor-pointer" onClick={logout}>
						Logout
					</div>
				</div>
			) : (
				<Link to="/login">Login</Link>
			)}
		</nav>
	);
}
