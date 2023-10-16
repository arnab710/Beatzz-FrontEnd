import style from "./HeroSlider.module.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Items from "./SliderItems";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSlider = () => {
	const [image, setImage] = useState(0);
	const Navigate = useNavigate();
	const handleClick = useCallback(
		(type) => {
			if (type === "left") {
				if (image < 0) return setImage((img) => img + 1);
				return setImage(-2);
			}
			if (type === "right") {
				if (image > -2) return setImage((img) => img - 1);

				return setImage(0);
			}
		},
		[image]
	);

	const handleShop = () => {
		Navigate("/products");
	};
	useEffect(() => {
		const id = setInterval(() => {
			handleClick("right");
		}, 5000);

		return () => clearInterval(id);
	}, [handleClick]);

	return (
		<div className={style.Hero}>
			<AiOutlineLeft
				onClick={() => {
					handleClick("left");
				}}
				className={style.leftArrow}
			/>
			<div style={{ transform: `translate(${image * 100}vw)` }} className={style.wrapper}>
				{Items.map((item) => (
					<div key={item.url}>
						<div style={{ backgroundImage: `${item.grad},url(${item.url})` }} className={style.slider}>
							<div className={style.text}>
								<h1>{item.heading}</h1>
								<p>{item.sub}</p>
								<button onClick={handleShop}>Shop Now</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<AiOutlineRight onClick={() => handleClick("right")} className={style.rightArrow} />
		</div>
	);
};

export default HeroSlider;
