/* eslint-disable react/prop-types */
import { BsBag } from "react-icons/bs";
import StarRating from "../StarRating/StarRating";
import style from "./Card.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, changeQuantity, removeItem } from "../../Redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const Card = ({ val }) => {
	const product = useSelector((state) => state.cart.products.find((product) => product._id === val._id));
	const dispatch = useDispatch();
	const location = useLocation();
	const Navigate = useNavigate();

	const User = useSelector((state) => state.user.name);
	const handleAddToCart = (val) => {
		if (!User) {
			toast.error("Please Login First", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
			Navigate("/login", { state: { from: location.pathname } });
		} else {
			const Item = { ...val, cartQuantity: 1 };
			toast.success("Item Added to Cart", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});
			dispatch(addItem({ Item }));
		}
	};
	const handleChangeQuantity = (sign) => {
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
			dispatch(removeItem({ id: val._id }));
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
			dispatch(changeQuantity({ id: val._id, sign }));
		}
	};

	return (
		<div className={style.card}>
			<Link to={`/product/${val._id}`}>
				<div className={style.imgContainer}>
					<img className={style.img1} src={val.pictures[0].url} alt="Item Picture" />
					<img className={style.img2} src={val.pictures[2].url} alt="Item Picture" />
				</div>

				<div className={style.text}>
					<h1 className={style.textName}>{val.name}</h1>
					<div className={style.textPara}>
						<span>
							<StarRating stars={Math.round(val.avgRating * 10) / 10} />
						</span>
						<span className={style.price}>$ {val.price}.00</span>
					</div>
				</div>
			</Link>
			{product?.cartQuantity > 0 ? (
				<span className={style.quantityBtn}>
					<button onClick={() => handleChangeQuantity(-1)} className={style.minusBtn}>
						-
					</button>
					<span className={style.showQuantity}>{product.cartQuantity}</span>
					<button onClick={() => handleChangeQuantity(1)} className={style.plusBtn}>
						+
					</button>
				</span>
			) : (
				<button onClick={() => handleAddToCart(val)} className={style.btn}>
					<span>
						<BsBag className={style.icon} />
					</span>
					<span> Add to Cart</span>
				</button>
			)}
		</div>
	);
};

export default Card;
