import { useGetMyOrders } from "../../Hooks/useGetMyOrders";
import style from "./MyOrders.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/Slices/CartSlice";

const MyOrders = () => {
	const { data: orderProducts, isLoading } = useGetMyOrders();
	const Navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(clearCart());
	}, [dispatch]);

	useEffect(() => {
		document.title = "Beatzz | My Orders";
		return () => (document.title = "Beatzz | Leading in Sound");
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const handleBackBtn = () => {
		Navigate("/products");
	};

	return (
		<>
			{isLoading ? (
				<div className={style.spinnerDiv}>
					<Loading />
				</div>
			) : (
				<div className={style.bodyMain}>
					<h1 className={`${style.cartHead} ${!orderProducts?.MyOrder?.length && style.noCartMargin}`}>My Orders</h1>
					{orderProducts?.MyOrder?.length ? (
						<div className={style.body2}>
							{orderProducts?.MyOrder?.map((productQuery, index) => (
								<ul key={index} className={style.cartList}>
									{productQuery.products.map((product) => (
										<li className={style.eachItem} key={product._id}>
											<Link to={`/product/${product._id}`} className={style.productNameDiv}>
												<div className={style.itemImgDiv}>
													<img className={style.itemImg} src={product?.productID?.pictures[0]?.url} alt="product's image" />
												</div>
												<span className={style.itemTitle}>{product.productID.name}</span>
											</Link>
											<span className={style.eachQuantity}>
												<span className={style.Qty}>Qty : </span>
												<span className={style.QtyNumber}>{product.quantity}</span>
											</span>
											<span className={style.totalPrice}>$ {product.productID.price * product.quantity}.00</span>
											<span className={style.status}>
												<span className={style.Delivery}>Delivery : </span>
												<span className={style.pending}>Pending</span>
											</span>
										</li>
									))}
								</ul>
							))}
							<Link to="/products" className={style.continueShopping}>
								<p>← Back to Shopping </p>
							</Link>
						</div>
					) : (
						<>
							<div className={style.emptyCartImgDiv}>
								<img className={style.emptyCartImg} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1692185119/pngwing.com_3_anrwwr.png" alt="empty cart picture" />
							</div>
							<h1 className={style.emptyCartText}>You do not have any active order :( </h1>
							<button onClick={handleBackBtn} className={style.emptyCartBtn}>
								Continue Shopping
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default MyOrders;
