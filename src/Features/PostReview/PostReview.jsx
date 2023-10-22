import { useState, useRef } from "react";
import StarPostRating from "../../Components/StarPostRating/StarPostRating";
import style from "./PostReview.module.css";
import usePostReview from "../../Hooks/usePostReview";
import SmallSpinner from "../../Components/SmallSpinner/SmallSpinner";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const PostReview = ({ id }) => {
	const [userRating, setUserRating] = useState("");
	const [resetRating, setResetRating] = useState(false);
	const textareaRef = useRef();

	const { mutate, isLoading } = usePostReview(id);

	const handleSubmit = () => {
		const review = textareaRef.current.value;
		const rating = Number(userRating);

		if (!review)
			return toast.error("You Must Provide a Review Description", {
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
					fontFamily: `"Inter",sans-serif`,
					letterSpacing: `0.03rem`,
					fontSize: `1.1rem`,
				},
			});

		mutate({ rating, review });
		textareaRef.current.value = "";
		setResetRating((val) => !val);
	};

	return (
		<section className={style.OnLoginReviewSection}>
			<div className={style.outerRatingDiv}>
				<h1 className={style.ReviewHeader}>Leave Your Review</h1>
				<div className={style.PostStarRatingDiv}>
					<h1 className={style.PostRatingHeader}>
						Your Rating <span style={{ color: `red`, fontSize: `1.2rem` }}>*</span>
					</h1>
					<StarPostRating maxRating={5} size={23} onSetRating={setUserRating} resetRating={resetRating} />
				</div>
				<div className={style.PostReviewDiv}>
					<h1 className={style.PostReviewHeader}>
						Your Review <span style={{ color: `red`, fontSize: `1.2rem` }}>*</span>
					</h1>
					<textarea ref={textareaRef} minLength={4} maxLength={40} name="review" placeholder="Write your review..." className={style.ReviewTextArea} cols="50" rows="10"></textarea>
				</div>
				<button disabled={isLoading} onClick={handleSubmit} className={style.SubmitBtn}>
					{isLoading ? (
						<p className={style.spinnerPara}>
							<SmallSpinner height={16} width={16} />
						</p>
					) : (
						<p>Submit</p>
					)}
				</button>
			</div>
		</section>
	);
};

export default PostReview;
