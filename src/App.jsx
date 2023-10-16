import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading/Loading";

const Home = lazy(() => import("./Pages/Home/Home"));
const EachProduct = lazy(() => import("./Pages/EachProduct/EachProduct"));
const Products = lazy(() => import("./Pages/Products/Products"));
const SignUp = lazy(() => import("./Pages/Sign-up/SignUp"));
const Layout = lazy(() => import("./Features/Layout/Layout"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Protected = lazy(() => import("./Features/Protected/Protected"));
const MyOrders = lazy(() => import("./Pages/My Orders/MyOrders"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{import.meta.env.VITE_APP_ENV !== "production" && <ReactQueryDevtools initialIsOpen={false} />}
			<BrowserRouter>
				<Suspense
					fallback={
						<div className="divLoader">
							<Loading />
						</div>
					}
				>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} end />
							<Route path="/product/:id" element={<EachProduct />} />
							<Route path="/products" element={<Products />} />
							<Route
								path="/cart"
								element={
									<Protected>
										<Cart />
									</Protected>
								}
							/>
							<Route
								path="/my-orders"
								element={
									<Protected>
										<MyOrders />
									</Protected>
								}
							/>
						</Route>

						<Route path="/login" element={<Login />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster
				position="bottom-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: { duration: 1500 },
					error: { duration: 3000 },
				}}
			/>
		</QueryClientProvider>
	);
};

export default App;
