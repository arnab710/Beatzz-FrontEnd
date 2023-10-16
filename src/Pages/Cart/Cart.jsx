import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css";
import { changeQuantity, removeItem } from "../../Redux/Slices/CartSlice";
import { Link, useLocation } from "react-router-dom";
import { useCartUpdate } from "../../Hooks/useCartUpdate";
import SmallSpinner from "../../Components/SmallSpinner/SmallSpinner";
import { useCheckOut } from "../../Hooks/useCheckOut";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const totalPriceCalculator = (cartProducts) => {
	let totalPrice = 0;
	for (let i = 0; i < cartProducts.length; i++) totalPrice += cartProducts[i].price * cartProducts[i].cartQuantity;
	return totalPrice;
};

const Cart = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const { mutate, isLoading } = useCartUpdate();
	const { mutate: checkOut, isLoading: isCheckoutLoading } = useCheckOut();
	const handleQuantity = (sign, product) => {
		if (sign === -1 && product.cartQuantity === 1) {
			toast.success("Item Removed from Cart", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
			dispatch(removeItem({ id: product._id }));
		} else {
			if (sign === 1)
				toast.success("Item Quantity Increased", {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
						fontFamily: `"Inter",sans-serif`,
						letterSpacing: `0.03rem`,
						fontSize: `1.1rem`,
					},
				});
			else
				toast.success("Item Quantity Decreased", {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
						fontFamily: `"Inter",sans-serif`,
						letterSpacing: `0.03rem`,
						fontSize: `1.1rem`,
					},
				});

			dispatch(changeQuantity({ sign, id: product._id }));
		}
	};

	const cartProducts = useSelector((state) => state.cart.products);
	const totalPrice = totalPriceCalculator(cartProducts);

	const handleCheckOut = () => {
		const cartValues = cartProducts.map((product) => {
			return { productID: product._id, quantity: product.cartQuantity };
		});
		mutate({ cartValues });
		checkOut({ cartValues });
	};

	const handleClick = () => {
		Navigate("/products");
	};

	return (
		<div className={style.bodyMain}>
			<h1 className={`${style.cartHead} ${!cartProducts.length && style.noCartMargin}`}>Shopping Cart</h1>
			{cartProducts.length ? (
				<>
					<div className={style.body2}>
						<ul className={style.cartList}>
							{cartProducts.map((product) => (
								<li className={style.eachItem} key={product._id}>
									<Link to={`/product/${product._id}`} className={style.productNameDiv}>
										<div className={style.itemImgDiv}>
											<img className={style.itemImg} src={product.pictures[0].url} alt="product's image" />
										</div>
										<span className={style.itemTitle}>{product.name}</span>
									</Link>
									<span className={style.eachPrice}>$ {product.price}.00</span>
									<span className={style.productQuantityBtn}>
										<button onClick={() => handleQuantity(-1, product)} className={style.minusBtn}>
											-
										</button>
										<span className={style.showQuantity}>{product.cartQuantity}</span>
										<button onClick={() => handleQuantity(1, product)} className={style.plusBtn}>
											+
										</button>
									</span>
									<span className={style.totalPrice}>$ {product.price * product.cartQuantity}.00</span>
								</li>
							))}
						</ul>
						<aside className={style.Summary}>
							<div className={style.SummaryMainDiv}>
								<h1 className={style.SummaryTitle}>Summary</h1>
								<div className={style.priceIndex}>
									<div className={style.priceProducts}>
										<span className={style.productSpan}>Products</span>
										<span className={style.priceSpan}>$ {totalPrice}.00</span>
									</div>
									<div className={style.priceProducts}>
										<span className={style.productSpan}>Shipping</span>
										<span className={style.priceSpan}>$ 00.00</span>
									</div>
								</div>
								<div className={style.allTotalPriceDiv}>
									<span className={style.allTotalPriceName}>Total Price</span>
									<span className={style.allTotalPrice}>$ {totalPrice}.00</span>
								</div>
								<button onClick={handleCheckOut} disabled={isLoading} className={style.checkOutBtn}>
									{isLoading || isCheckoutLoading ? (
										<p>
											<SmallSpinner />
										</p>
									) : (
										<p>
											CHECKOUT <span className={style.arrowRight}>→</span>
										</p>
									)}
								</button>
							</div>
						</aside>
					</div>
				</>
			) : (
				<>
					<div className={style.emptyCartImgDiv}>
						<img className={style.emptyCartImg} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1692185119/pngwing.com_3_anrwwr.png" alt="empty cart picture" />
					</div>
					<h1 className={style.emptyCartText}>Your Cart is Empty :( </h1>
					<button className={style.emptyCartBtn} onClick={handleClick}>
						Continue Shopping
					</button>
				</>
			)}
		</div>
	);
};

export default Cart;
