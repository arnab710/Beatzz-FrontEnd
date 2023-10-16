import useFetch from "../../Hooks/useFetch";
import style from "./NewArrival.module.css";
import { useMemo, useRef } from "react";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";

const NewArrival = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, isError } = useFetch(`limit=8`, 24 * 60 * 60 * 1000);

	const ref = useRef();
	const obj = useMemo(() => ({ threshold: 0.1 }), []);
	const isShowing = useIntersectionObserver(ref, obj);

	return (
		<section className={style.body}>
			<h1 ref={ref} className={`${style.header} ${isShowing ? style.show : ""}`}>
				New Arrivals
			</h1>
			<div className={style.cardContainer}>
				{isLoading && <Loading styled={style.spinner} />}
				{data && data.AllProducts.map((val) => <Card val={val} key={val._id} />)}
			</div>
		</section>
	);
};

export default NewArrival;
