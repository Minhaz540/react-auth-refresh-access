import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "./Field";
import useAuth from "../hooks/useAuth";
import { setEncryptedCookie } from "../lib/cookieStore";

export default function LoginForm() {
	const { setAuth } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm();
	const navigate = useNavigate();

	const submitForm = async (formData) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/login`,
				formData
			);

			const { user, accessToken, refreshToken, success } = response.data;

			if (success) {
				setAuth({ user, accessToken, refreshToken });
				setEncryptedCookie("_at", accessToken, 1 / 24); // 24 hours expiration date
				setEncryptedCookie("_rt", refreshToken, 1); // 1 day
				navigate("/");
			} else {
				setError("root.error", {
					type: "validation",
					message: response?.data?.message,
				});
			}
		} catch (error) {
			console.error(error);
			setError("root.error", {
				type: "validation",
				message: error?.response?.data?.message.map((msg) => msg).join(", "),
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(submitForm)}>
			<div className="mb-3">
				<Field label="Email" error={errors.email} htmlFor="email">
					<input
						{...register("email", {
							required: "Email id is required",
						})}
						type="email"
						id="email"
						disabled={isSubmitting}
						name="email"
						className={`w-full p-3 border ${
							errors.email ? "border-red-500" : "border-black/20"
						} rounded-md focus:outline-none focus:border-indigo-500 `}
					/>
				</Field>
			</div>

			<div className="mb-3">
				<Field label="Password" htmlFor="password" error={errors.password}>
					<input
						{...register("password", {
							required: "Password is Required",
							minLength: {
								value: 8,
								message: "Your password must be at least 8 characters long",
							},
						})}
						className={`w-full p-3 border ${
							errors.password ? "border-red-500" : "border-black/20"
						}  rounded-md focus:outline-none focus:border-indigo-500 `}
						type="password"
						name="password"
						disabled={isSubmitting}
						id="password"
					/>
				</Field>
			</div>
			<p className="text-center m-2 text-red-500">{errors?.root?.error?.message}</p>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
			>
				Login
			</button>

			<p className="text-center">
				Don&apos;t have an account?{" "}
				<Link to="/registration" className="text-indigo-600 hover:underline">
					Register
				</Link>
			</p>
		</form>
	);
}
