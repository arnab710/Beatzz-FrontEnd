import { Link as ScrollLink, Element } from "react-scroll";
import { AiFillStar } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import useFetchSingleProduct from "../../Hooks/useFetchSingleProduct";
import useProductReviews from "../../Hooks/useProductReviews";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./EachProduct.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import PostReview from "../../Features/PostReview/PostReview";
import { addItem, changeQuantity, removeItem } from "../../Redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const EachProduct = () => {
	const { id } = useParams();
	const [mainImg, setMainImg] = useState(0);

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const { data, isLoading } = useFetchSingleProduct(id);
	const { data: reviews, isLoading: isReviewLoading } = useProductReviews(id);
	const descriptionSeg = data ? data.product.description.split(",,,") : null;
	const descriptionSeg2 = data ? data.product.description.replace(/,,,/g, "") : null;
	const des_arr = descriptionSeg2 ? descriptionSeg2.split(" ") : null;
	const shortDes = des_arr ? des_arr.slice(0, 13).join(" ") : null;

	useEffect(() => {
		if (data) document.title = data.product.name;
		return () => (document.title = "Beatzz | Leading in Sound");
	}, [data]);

	const Navigate = useNavigate();
	const userDataName = useSelector((state) => state.user.name);

	const cartProduct = useSelector((state) =>
		state.cart.products.find((product) => {
			if (data) return product._id === data.product._id;
			return undefined;
		})
	);

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		if (data) {
			const Item = { ...data.product, cartQuantity: 1 };
			dispatch(addItem({ Item }));
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
		}
	};

	const handleChangeQuantity = (sign) => {
		if (data) {
			if (sign === -1 && cartProduct.cartQuantity === 1) {
				dispatch(removeItem({ id: data.product._id }));
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

				dispatch(changeQuantity({ id: data.product._id, sign }));
			}
		}
	};
	return (
		<>
			{isLoading || isReviewLoading ? (
				<div className={style.spinnerDiv}>
					<Loading />
				</div>
			) : (
				<div className={style.EachProduct}>
					<div className={style.body1}>
						{data && (
							<div className={style.bannerTag}>
								<h1>{data.product.name}</h1>
							</div>
						)}
						<img className={style.img} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690816723/petri-r-gehzL37x6zY-unsplash_kitlwd.jpg" alt="backgroung-image" />
					</div>

					<section className={style.body2}>
						<section className={style.product}>
							<section className={style.productImg}>
								<div className={style.mainImgDiv}>{data && <img className={style.headMainImg} src={data.product.pictures[mainImg].url} alt="product image" />}</div>
								<div className={style.subImgDiv}>
									{data &&
										data.product.pictures.map((each, i) => (
											<div className={style.subImgInsideDiv} onClick={() => setMainImg(i)} key={i}>
												<img className={style.subImg} src={each.url} alt="product img" />
											</div>
										))}
								</div>
							</section>
							<section className={style.details}>
								{data && (
									<div className={style.detailsUpperDiv}>
										<div className={style.titleDiv}>
											<h1 className={style.title}>{data.product.name}</h1>
											<p className={style.shortDes}>
												{shortDes} ...
												<span className={style.readMore}>
													<ScrollLink to="description" smooth={true} duration={1000}>
														read more
													</ScrollLink>
												</span>
											</p>
											<div className={style.RatingSection}>
												<div className={style.ratingDiv}>
													<h1 className={style.ratingHead}>{Math.round(data.product.avgRating * 10) / 10}</h1>
													<AiFillStar className={style.star} />
												</div>
												<h1 className={style.totalReviews}>{data.product.totalReviews} Ratings</h1>
											</div>
										</div>
										<div className={style.priceTag}>
											<h1 className={style.price}>$ {data.product.price}.00</h1>
											<p className={style.taxPara}> Inclusive of All Taxes</p>
										</div>

										<div className={style.tags}>
											<ul className={style.tagList}>
												<li>
													<span className={style.tagHead}>Availability</span> : <span className={`${style.inStock} ${style.tagAns}`}>In Stock</span>
												</li>
												<li>
													<span className={style.tagHead}>Type</span> : <span className={`${style.tagAns}`}>Wireless</span>
												</li>
												<li>
													<span className={style.tagHead}>Material</span> : <span className={`${style.tagAns}`}>Silicon</span>
												</li>
												<li>
													<span className={style.tagHead}>Vendor</span> : <span className={`${style.tagAns}`}>Beatzz</span>
												</li>
											</ul>
										</div>
									</div>
								)}
								{cartProduct && cartProduct.cartQuantity > 0 ? (
									<span className={style.cartBtn}>
										<button onClick={() => handleChangeQuantity(-1)} className={style.minusBtn}>
											-
										</button>
										<span className={style.cartQuantity}>{cartProduct.cartQuantity}</span>
										<button onClick={() => handleChangeQuantity(1)} className={style.plusBtn}>
											+
										</button>
									</span>
								) : (
									<button onClick={handleAddToCart} className={style.btn}>
										<span>
											<BsBag className={style.icon} />
										</span>
										<span> Add to Cart</span>
									</button>
								)}
							</section>
						</section>
						<aside className={style.sideBar}>
							<div className={style.custoFeatureDiv}>
								<ul className={style.featureList}>
									<li>
										<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services1_jfjbmk.svg" alt="Delivery" />
										<h1>FREE SHIPPING</h1>
									</li>
									<li>
										<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services3_gmujje.svg" alt="Return" />
										<h1>100% MONEY BACK GUARANTEE</h1>
									</li>
									<li>
										<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services4_wxjw0p.svg" alt="Support" />
										<h1>ONLINE SUPPORT 24/7</h1>
									</li>
									<li>
										<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services2_r8bma8.svg" alt="Secure" />
										<h1>SECURE PAYMENTS</h1>
									</li>
								</ul>
							</div>
							<div className={style.sideImg}>
								<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1691077741/adam-birkett-vISNAATFXlE-unsplash_pgukfq.jpg" alt="feature image" />
							</div>
						</aside>
					</section>
					{data && (
						<Element name="description">
							<section className={style.body3}>
								<h1 className={style.descriptionHeader}>DESCRIPTION</h1>
								<ul className={style.descriptionPara}>
									{descriptionSeg.map((segment, ind) => (
										<li className={style.descriptionEach} key={ind}>
											{ind < descriptionSeg.length - 1 && ind !== 0 ? `• ${segment}` : segment}
										</li>
									))}
								</ul>

								<section className={style.reviewSection}>
									<h1 className={style.descriptionHeader}>REVIEWS</h1>
									<section className={style.reviewPostReview}>
										{reviews && reviews.count > 0 ? (
											<ul className={style.reviewList}>
												{reviews.reviews.map((review) => (
													<li className={style.eachReview} key={review._id}>
														<div className={style.ratingPeople}>
															<h1 className={style.ratingNumber}>{review.rating}</h1>
															<AiFillStar className={style.starRatingIcon} />
														</div>
														<div className={style.ratingProfile}>
															<h1 className={style.reviewPara}>{review.review}</h1>
															<h1 className={style.reviewUserName}>{review.userId.name}</h1>
														</div>
													</li>
												))}
											</ul>
										) : (
											<div className={style.noReview}>
												<p>There are No Reviews Yet.</p>
											</div>
										)}
										{!userDataName ? (
											<section className={style.reviewPostSection}>
												<img className={style.postReviewImg} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1691935379/ryan-quintal-zm42KtKcn9c-unsplash_exrsag.jpg" alt="Login Image" />

												<div className={style.LoginDiv}>
													<h1 className={style.LoginDivH1}>Post a Review</h1>
													<button onClick={() => Navigate("/login", { state: { from: location.pathname } })} className={style.LoginButton}>
														Login Now
													</button>
												</div>
											</section>
										) : (
											<PostReview id={id} />
										)}
									</section>
								</section>
							</section>
						</Element>
					)}
				</div>
			)}
		</>
	);
};

export default EachProduct;
