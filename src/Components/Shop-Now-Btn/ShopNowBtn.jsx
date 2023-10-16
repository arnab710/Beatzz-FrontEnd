import { useNavigate } from "react-router-dom";
import style from "./ShopNowBtn.module.css";

const ShopNowBtn = () => {
	const Navigate = useNavigate();

	const handleClick = () => {
		Navigate("/products");
	};

	return (
		<button onClick={handleClick} className={style.btn}>
			Shop Now
		</button>
	);
};

export default ShopNowBtn;
