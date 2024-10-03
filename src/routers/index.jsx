import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import NavLayout from "../layouts/NavLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardPage from "../pages/dashboard/Dashboard";
import AboutPage from "../pages/about/About";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import ProfilePage from "../pages/profile/Profile";
import Root from "../layouts/Root";
import HomePage from "../pages/home/HomePage";
import LoggedInRoute from "./LoggedInRoute";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";

export const routers = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route element={<NavLayout />}>
				<Route index element={<HomePage />} />
				<Route path="about" element={<AboutPage />} />
				<Route
					path="profile"
					element={
						<LoggedInRoute>
							<ProfilePage />
						</LoggedInRoute>
					}
				/>
				<Route
					path="dashboard"
					element={
						<LoggedInRoute>
							<AdminRoute>
								<DashboardPage />
							</AdminRoute>
						</LoggedInRoute>
					}
				/>
			</Route>
			<Route element={<AuthLayout />}>
				<Route
					path="login"
					element={
						<GuestRoute>
							<Login />
						</GuestRoute>
					}
				/>
				<Route
					path="registration"
					element={
						<GuestRoute>
							<Registration />
						</GuestRoute>
					}
				/>
			</Route>
		</Route>
	)
);
