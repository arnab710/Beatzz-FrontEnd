import { Element } from "react-scroll";
import { useMemo, useRef } from "react";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import style from "./OnSale.module.css";
import Card from "../../Components/Card/Card";
import useInfiniteScrolling from "../../Hooks/useInfiniteScrolling";
import Loading from "../../Components/Loading/Loading";
import SkeletonCard from "../../Components/Skeleton-Card/SkeletonCard";

const OnSale = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useInfiniteScrolling("OnSaleProducts", 4);

	const ref = useRef();
	const obj = useMemo(() => ({ threshold: 0.1 }), []);
	const isShowing = useIntersectionObserver(ref, obj);

	return (
		<Element name="onSale">
			<section className={style.body}>
				<h1 ref={ref} className={`${style.header} ${isShowing ? style.show : ""}`}>
					On Sale
				</h1>
				{isLoading && (
					<div className={style.loadingDiv}>
						<Loading type={`spin`} color={`black`} styled={style.spinner} />
					</div>
				)}
				<div className={style.cardContainer}>
					{data && data.pages.map((grp) => grp.AllProducts.map((val) => <Card val={val} key={val._id} />))}
					{isFetchingNextPage && (
						<>
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</>
					)}
				</div>

				{data && data.pages.length < 3 && (
					<button className={style.Loadbtn} onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</section>
		</Element>
	);
};

export default OnSale;
