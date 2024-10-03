import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import { getDecryptedCookie, setEncryptedCookie } from "../lib/cookieStore";
import { decodeToken } from "../lib/jwtDecodeLib";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	if (!context) throw new Error("useAuth hook must be used within the AuthProvider");

	const { setAuth } = context;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkTokens = async () => {
			const accessToken = getDecryptedCookie("_at");
			const refreshToken = getDecryptedCookie("_rt");

			if (accessToken) {
				const userInfo = decodeToken(accessToken);
				setAuth({ ...userInfo, accessToken, refreshToken });
				setLoading(false);
			} else if (refreshToken) {
				try {
					const response = await api.post("/auth/refresh-token", { refreshToken });
					const newAccessToken = response.data.accessToken;
					const newRefreshToken = response.data.refreshToken;

					setEncryptedCookie("_at", newAccessToken, 1 / 24);
					setEncryptedCookie("_rt", newRefreshToken, 1);

					const userInfo = decodeToken(newAccessToken);
					setAuth({
						...userInfo,
						accessToken: newAccessToken,
						refreshToken: newRefreshToken,
					});
				} catch (error) {
					console.error("Token refresh failed:", error);
					navigate("/login");
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
				navigate("/login");
			}
		};

		checkTokens();
	}, [setAuth, navigate]);

	return { ...context, loading };
}
