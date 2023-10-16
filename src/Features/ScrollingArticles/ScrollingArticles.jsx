import { useRef } from "react";
import ShopNowBtn from "../../Components/Shop-Now-Btn/ShopNowBtn";
import style from "./ScrollingArticles.module.css";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";

// eslint-disable-next-line react/prop-types
const ScrollingArticles = ({ heading = "", para = "", imgURL = "", imgPos = "right" }) => {
	const ref = useRef();
	const visible = useIntersectionObserver(ref);

	return (
		<>
			{imgPos === "right" ? (
				<article ref={ref} className={`${style.article} ${style.article2} ${visible ? style.show : style.hide}`}>
					<div className={style.text1}>
						<h1 className={style.heading}>{heading}</h1>
						<p className={style.text}>{para}</p>
						<ShopNowBtn />
					</div>
					<div className={style.imgContainer}>
						<img className={style.image1} src={imgURL} alt="image" />
					</div>
				</article>
			) : (
				<article ref={ref} className={`${style.article} ${style.article1} ${visible ? style.show : style.hide}`}>
					<div className={style.imgContainer}>
						<img className={style.image1} src={imgURL} alt="image" />
					</div>
					<div className={style.text1}>
						<h1 className={style.heading}>{heading}</h1>
						<p className={style.text}>{para}</p>
						<ShopNowBtn />
					</div>
				</article>
			)}
		</>
	);
};

export default ScrollingArticles;
