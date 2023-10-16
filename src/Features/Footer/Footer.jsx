import Logo from "../../Components/Logo/Logo";
import useFetch from "../../Hooks/useFetch";
import style from "./Footer.module.css";
const Footer = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError } = useFetch(`limit=8`, 24 * 60 * 60 * 1000);
	return (
		<footer className={style.body}>
			<div className={style.Container}>
				<div className={style.NameTag}>
					<Logo logoStyle={style.logo} />
				</div>
				<div className={style.QuickLinks}>
					<div className={style.links}>
						<h1>Quick Links</h1>
						<ul>
							<li>About</li>
							<li>Contact</li>
							<li>Blogs</li>
							<li>FAQ</li>
						</ul>
					</div>
				</div>
				<div className={style.Account}>
					<div className={style.links}>
						<h1>Account Links</h1>
						<ul>
							<li>My Account</li>
							<li>Orders Tracking</li>
							<li>Checkout</li>
							<li>Wishlist</li>
						</ul>
					</div>
				</div>
				<div className={style.ProductLink}>
					<div className={style.links}>
						<h1>Product Links</h1>
						<ul>
							<li>{data ? data.AllProducts[0].name : "Product Link 1"}</li>
							<li>{data ? data.AllProducts[1].name : "Product Link 2"}</li>
							<li>{data ? data.AllProducts[2].name : "Product Link 3"}</li>
							<li>{data ? data.AllProducts[3].name : "Product Link 4"}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={style.downText}>Copyright © 2023 All rights reserved | Beatzz</div>
		</footer>
	);
};

export default Footer;
