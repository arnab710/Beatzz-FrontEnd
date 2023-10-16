import { useMemo, useRef } from "react";
import style from "./ImageContainer.module.css";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import { useNavigate } from "react-router-dom";

const ImageContainer = () => {
	const refMain = useRef();
	const refSub = useRef();
	const Navigate = useNavigate();
	const obj = useMemo(() => ({ threshold: 0.1 }), []);
	const isVisibleMain = useIntersectionObserver(refMain, obj);
	const isVisibleSub = useIntersectionObserver(refSub, obj);
	return (
		<section className={style.imgContainer}>
			<div className={style.imgStyle}>
				<div ref={refMain} className={`${style.imgText} ${isVisibleMain ? style.show : ""}`}>
					<h1 className={style.imgHeadText}>Pushing Boundaries in Sound Technology</h1>
					<button className={style.btn1}>About Us</button>
				</div>
			</div>
			<div className={style.imgSection}>
				<div className={style.imgLeft}>
					<div ref={refSub} className={`${style.SummerText} ${isVisibleSub ? style.show : ""}`}>
						<h1>Summer Sale</h1>
						<p>upto 50% off</p>
						<button onClick={() => Navigate("/products")} className={style.btn2}>
							Shop Now
						</button>
					</div>
				</div>
				<div className={style.imgRight}>
					<div className={`${style.visionText} ${isVisibleSub ? style.show : ""}`}>
						<h1>Transform Your Audio Journey</h1>
						<button className={style.btn3}>Explore Our Vision</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImageContainer;
