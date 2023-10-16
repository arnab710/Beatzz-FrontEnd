import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import style from "./StarRating.module.css";
// eslint-disable-next-line react/prop-types
const StarRating = ({ stars, Style = "" }) => {
	const ratingStar = Array.from({ length: 5 }, (_, index) => {
		const fullStarIndex = index + 1;
		const halfStarIndex = index + 0.5;

		return (
			<span key={index}>
				{stars >= fullStarIndex ? <FaStar className={style.icon} /> : stars >= halfStarIndex ? <FaStarHalfAlt className={style.icon} /> : <AiOutlineStar className={style.emptyIcon} />}
			</span>
		);
	});

	return (
		<section className={`${Style ? Style : style.starContainer}`}>
			<div className={style.iconStyle}>{ratingStar}</div>
			<span>({stars})</span>
		</section>
	);
};

export default StarRating;
