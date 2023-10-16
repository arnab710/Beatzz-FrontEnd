import style from "./FeatureArticle.module.css";
import { useRef, useMemo } from "react";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";

const FeatureArticle = () => {
	const leftRef = useRef();
	const rightRef = useRef();
	const option = useMemo(() => ({ threshold: 0.2 }), []);
	const leftVisible = useIntersectionObserver(leftRef);
	const rightVisible = useIntersectionObserver(rightRef, option);

	return (
		<div className={style.body2}>
			<h1 className={style.resHead}>Revolutionize Your Sound</h1>
			<section className={style.features}>
				<div ref={leftRef} className={`${style.leftFeature} ${leftVisible ? style.leftShow : ""}`}>
					<h1>Wear it with ease and comfort ever.</h1>
					<p>
						Experience unparalleled comfort with Beatzz. Our headphones are designed to fit perfectly on your ears, letting you enjoy your music for hours on end without any strain. Beatzz - Comfort
						in every beat.
					</p>
					<img className={style.featureImg} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689497782/adrian-regeci-skw9mNbWd7w-unsplash-removebg-preview_x1cw96.png" alt="image" />
				</div>
				<div ref={rightRef} className={`${style.rightFeature} ${rightVisible ? style.rightShow : ""}`}>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689499311/wifi_443875_ichvyc.png" alt="wireless" />

						<h1>Wireless</h1>
						<p>Experience untethered freedom and mobility with our wireless technology.</p>
					</div>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689499311/microphone_6682752_vreghh.png" alt="microphone" />

						<h1>Microphone</h1>
						<p>Communicate clearly and effortlessly with built-in high-quality microphones.</p>
					</div>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689499312/ear_5274151_cpwmay.png" alt="noise cancel" />

						<h1>Noise Cancellation</h1>
						<p>Immerse yourself in pure sound by filtering out the noise of the world.</p>
					</div>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689499312/bluetooth_2778335_f0hrsm.png" alt="Bluetooh" />

						<h1>Bluetooth</h1>
						<p>Seamlessly connect with all your devices, for uninterrupted audio flow.</p>
					</div>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689498938/headphones_9810625_n6tuu3.png" alt="Headphone" />

						<h1>Perfect Sound</h1>
						<p>Dive into the depth of every note with our crystal-clear sound quality.</p>
					</div>
					<div className={style.rightFeatureDiv}>
						<img src="https://res.cloudinary.com/dje9gn9we/image/upload/v1689499311/battery_978022_ykeqrl.png" alt="battery" />

						<h1>Long Battery Life</h1>
						<p>Keep the beats going with our long-lasting battery life.</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default FeatureArticle;
