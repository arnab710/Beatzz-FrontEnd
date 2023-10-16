import "react-loading-skeleton/dist/skeleton.css";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Card from "../../Components/Card/Card";
import Nav from "../../Features/NavBar/Nav";
import useInfiniteScrolling from "../../Hooks/useInfiniteScrolling";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import style from "./Products.module.css";
import SkeletonCard from "../../Components/Skeleton-Card/SkeletonCard";
import Loading from "../../Components/Loading/Loading";
import FilterProducts from "../../Features/FilterProduct/FilterProducts";
import Footer from "../../Features/Footer/Footer";
import { useLocation, useSearchParams } from "react-router-dom";

const options = {
	"Price-asc": "price",
	"Price-dec": "-price",
	"Name-asc": "name",
	"Name-dec": "-name",
	"Rating-asc": "avgRating",
	"Rating-dec": "-avgRating",
};

const Products = () => {
	const [searchParam] = useSearchParams();
	const { pathname } = useLocation();

	useEffect(() => {
		document.title = "Explore Our Collections";
		return () => (document.title = "Beatzz | Leading in Sound");
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const SortQuery = options[`${searchParam.get("Sort-by")}`];
	const NameQuery = searchParam.get("name");
	const value = useInfiniteScrolling("AllProducts", 4, SortQuery, NameQuery);

	const ref = useRef();
	const isEnding = useIntersectionObserver(ref);
	const val = useMemo(() => value, [value]);

	const fetchNextPagefxn = useCallback(() => val.fetchNextPage(), [val]);

	useEffect(() => {
		if (isEnding && value.data && value.data.pages.length < 6) fetchNextPagefxn();
	}, [fetchNextPagefxn, isEnding, value]);

	return (
		<>
			<div className={style.container}>
				<Nav />
				<div className={style.body}>
					<div className={style.header}>
						<h1>Our Products</h1>
					</div>
					<img className={style.img} src="https://res.cloudinary.com/dje9gn9we/image/upload/v1690554534/wu-yi-sYhyE3CeTy4-unsplash_geny2y.jpg" alt="picture" />
				</div>
				<section className={style.body2}>
					<div className={style.filters}>
						<FilterProducts />
					</div>

					<div className={style.cardContainer}>{val.data && val.data.pages.map((grp) => grp.AllProducts.map((val) => <Card val={val} key={val._id} />))}</div>
				</section>
				{value.isLoading && (
					<div className={style.loadingDiv}>
						<Loading type={`spin`} color={`black`} styled={style.spinner} />
					</div>
				)}
				<div className={style.productShowDiv} ref={ref}>
					{val.data && val.data.pages.length < 6 && val.data.pages[0].count >= 4 && (
						<section className={style.body3}>
							{val.isFetchingNextPage && (
								<div className={style.cardContainer2}>
									<SkeletonCard />
									<SkeletonCard />
									<SkeletonCard />
									<SkeletonCard />
								</div>
							)}
						</section>
					)}
				</div>
				{!val.isLoading && <Footer />}
			</div>
		</>
	);
};

export default Products;
