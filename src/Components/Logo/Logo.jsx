import { Link } from "react-router-dom";
import Style from "./Logo.module.css";

// eslint-disable-next-line react/prop-types
const Logo = ({ logoStyle = "" }) => {
	return (
		<Link to="/" className={logoStyle ? logoStyle : Style.logo}>
			<img src="/logo.png" alt="Beatzz logo" />
			<span>
				Beat<span className={Style.zz}>zz</span>
			</span>
		</Link>
	);
};
export default Logo;
