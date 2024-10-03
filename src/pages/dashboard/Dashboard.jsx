import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import useAuth from "../../hooks/useAuth";

export default function DashboardPage() {
	const { auth } = useAuth();
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			try {
				const response = await api.get("/book", {
					headers: { Authorization: `Bearer ${auth.accessToken}` },
				});
				if (response.data?.success) {
					setBooks(response.data?.books);
				} else {
					setError(response.data?.message);
				}
			} catch (error) {
				console.error(error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [auth]);

	return (
		<section>
			<div>This is secured dashboard, only admin can visit here</div>

			{loading ? (
				<span>Loading...</span>
			) : (
				<>
					<h1 className="font-bold text-lg mt-1">All books list:</h1>
					{books?.map((book) => (
						<div key={book._id}>{book.name}</div>
					))}
				</>
			)}
			{error && <p className="text-red-500">{error}</p>}
		</section>
	);
}
