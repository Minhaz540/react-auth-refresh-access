import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "./Field";

export default function RegistrationForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({ defaultValues: { fullName: "", email: "", password: "" } });
	const navigate = useNavigate();

	const submitForm = async (formData) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/registration`,
				formData
			);

			if (response.data?.success) {
				navigate("/login", { replace: true });
			} else {
				console.log(response.data);
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
				<Field label="FullName" error={errors.fullName} htmlFor="fullName">
					<input
						{...register("fullName", {
							required: "Full Name is required",
						})}
						disabled={isSubmitting}
						id="fullName"
						name="fullName"
						className={`w-full p-3 border ${
							errors.email ? "border-red-500" : "border-black/20"
						} rounded-md focus:outline-none focus:border-indigo-500 `}
					/>
				</Field>
			</div>

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
						disabled={isSubmitting}
						className={`w-full p-3 border ${
							errors.password ? "border-red-500" : "border-black/20"
						}  rounded-md focus:outline-none focus:border-indigo-500 `}
						type="password"
						name="password"
						id="password"
					/>
				</Field>
			</div>
			<p className="my-2 text-left text-red-500">{errors?.root?.error.message}</p>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
			>
				Register
			</button>

			<p className="text-center">
				Don&apos;t have an account?{" "}
				<Link to="/login" className="text-indigo-600 hover:underline">
					Login
				</Link>
			</p>
		</form>
	);
}
