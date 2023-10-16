import style from "./CustomerFeature.module.css";

const CustomerFeature = () => {
	return (
		<section className={style.body}>
			<div className={style.topContainer}>
				<div className={style.container}>
					<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services1_jfjbmk.svg" alt="Delivery Icon" />
					<div className={style.text}>
						<h1>Fast & Free Delivery</h1>
						<p>Free delivery on all orders</p>
					</div>
				</div>
				<div className={style.container}>
					<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services2_r8bma8.svg" alt="Secure Icon" />
					<div className={style.text}>
						<h1>Secure Payment</h1>
						<p>Safe Transactions, Simplified</p>
					</div>
				</div>
				<div className={style.container}>
					<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services3_gmujje.svg" alt="Return Icon" />
					<div className={style.text}>
						<h1>Money Back Guarantee</h1>
						<p>Hassle-Free Returns</p>
					</div>
				</div>
				<div className={style.container}>
					<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690207731/services4_wxjw0p.svg" alt="Support Icon" />
					<div className={style.text}>
						<h1>Online Support</h1>
						<p>Always Here For You</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerFeature;
