import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

const NotFound = () => {
	return (
		<div className={style.divmain}>
			<h1 className={style.header}>404</h1>
			<p className={style.NotFound}>Not Found :(</p>
			<Link to="/" className={style.Home}>
				← Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
