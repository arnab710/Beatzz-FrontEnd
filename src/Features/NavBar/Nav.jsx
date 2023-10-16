import { useLocation } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import style from "./Nav.module.css";
import { BsCart3 } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiFillCaretDown, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";
import { useLogOut } from "../../Hooks/useLogOut";

// eslint-disable-next-line react/prop-types
const Nav = ({ background = "" }) => {
	const location = useLocation();
	const userData = useSelector((data) => data.user.name);
	const cartNumber = useSelector((state) => state.cart.products.length);

	let displayName = "";
	if (userData) displayName = userData.split(" ")[0];

	const [showAbout, setShowAbout] = useState(false);
	const [showContact, setShowContact] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const { mutate } = useLogOut();

	const handleOnclick = (e) => {
		e.preventDefault();
		mutate();
	};

	return (
		<div className={`${background ? background : style.background} ${showNav ? style.darkBack : ""} ${(location.pathname === "/cart" || location.pathname === "/my-orders") && style.cartNav}`}>
			<div className={style.navContents}>
				<Logo logoStyle={style.logo} />
				<ul className={`${style.links} ${showNav ? style.showNAV : ""}`}>
					<li className={style.linknames}>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/products">Shop</NavLink>
					</li>
					{location.pathname === "/" && (
						<li>
							<ScrollLink to="onSale" smooth={true} duration={2000}>
								On Sale
							</ScrollLink>
						</li>
					)}
					<li className={style.about} onClick={() => setShowAbout((show) => !show)}>
						<span>About Us</span>

						<span className={style.icons}>
							<AiFillCaretDown />
						</span>
						<ul className={`${style.dropMenu} ${showAbout ? style.show : ""}`}>
							<li>
								<Link href="#">Our Story</Link>
							</li>
							<li>
								<Link href="#">Our Values</Link>
							</li>
							<li>
								<Link href="#">Customer Testimonials</Link>
							</li>
						</ul>
					</li>
					<li className={style.about} onClick={() => setShowContact((show) => !show)}>
						<span>Contact Us</span>

						<span className={style.icons}>
							<AiFillCaretDown />
						</span>
						<ul className={`${style.dropMenu} ${showContact ? style.show : ""}`}>
							<li className={style.dropIcons}>
								<a href="#">
									<span>
										<AiOutlineTwitter className={style.socialIcon} />
										Twitter
									</span>
								</a>
							</li>
							<li className={style.dropIcons}>
								<a href="#">
									<span>
										<AiFillLinkedin className={style.socialIcon} />
										LinkedIn
									</span>
								</a>
							</li>
							<li className={style.dropIcons}>
								<a href="#">
									<span>
										<BsFacebook className={style.socialIcon} />
										Facebook
									</span>
								</a>
							</li>
							<li className={style.dropIcons}>
								<a href="#">
									<span>
										<AiFillInstagram className={style.socialIcon} />
										Instagram
									</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<ul className={style.profile}>
					{!userData ? (
						<Link to="/login" className={style.login}>
							Login
						</Link>
					) : (
						<>
							<NavLink to="/cart">
								<li className={style.cartIcon}>
									<BsCart3 />
									<span className={style.cartNumber}>{cartNumber}</span>
								</li>
							</NavLink>
							<li className={`${style.user} ${style.userData} ${style.about}`}>
								<BiUser />
								<span className={style.userName}>{displayName}</span>
								<ul className={style.userDataList}>
									<li>
										<Link to="/cart">My Cart</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => handleOnclick(e)}>
											Log Out
										</Link>
									</li>
								</ul>
							</li>
						</>
					)}
					<li>
						<RxHamburgerMenu className={style.hamBurger} onClick={() => setShowNav((show) => !show)} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Nav;
