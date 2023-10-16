import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSlider from "../../Features/HeroSlider/HeroSlider";
import ScrollingArticles from "../../Features/ScrollingArticles/ScrollingArticles";
import style from "./Home.module.css";
import NewArrival from "../../Features/NewArrival/NewArrival";
import ImageContainer from "../../Features/ImageContainer/ImageContainer";
import FeatureArticle from "../../Features/FeatureArticle/FeatureArticle";
import OnSale from "../../Features/OnSale/OnSale";
import CustomerFeature from "../../Features/CustomerFeature/CustomerFeature";

const Home = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<div className={style.main}>
				<div className={style.Home}>
					<HeroSlider />
					<div className={style.body}>
						<ScrollingArticles
							heading="Less Noise More Sound"
							para="Experience pure, unadulterated sound with Beatzz. Our cutting-edge noise cancellation technology lets you focus on what truly matters - your music. With Beatzz, every beat counts."
							imgURL="https://res.cloudinary.com/dje9gn9we/image/upload/v1689334478/vinicius-amnx-amano-vl-sARMHTkQ-unsplash_heohwp.jpg"
							imgPos="right"
						/>
						<ScrollingArticles
							heading="Tune into Clarity"
							para="Immerse yourself in the purest soundscapes with Beatzz. Let our advanced noise cancellation technology tune out distractions and tune you into your music. With Beatzz, it's you and your rhythm."
							imgURL="https://res.cloudinary.com/dje9gn9we/image/upload/v1689442524/pexels-sound-on-3756920_c7lmee.jpg"
							imgPos="left"
						/>
					</div>
					<NewArrival />
				</div>
				<ImageContainer />
				<FeatureArticle />
				<OnSale />
				<CustomerFeature />
			</div>
		</>
	);
};

export default Home;
