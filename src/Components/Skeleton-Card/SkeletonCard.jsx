import Skeleton from "react-loading-skeleton";
import style from "./SkeletonCard.module.css";

const SkeletonCard = () => {
	return (
		<div className={style.card}>
			<div className={style.imgContainer}>
				<Skeleton enableAnimation={true} circle={true} width={150} height={150} style={{ display: `block`, margin: `auto` }} />
			</div>
			<div className={style.text}>
				<h1 className={style.textName}>
					<Skeleton enableAnimation={true} style={{ height: `29px` }} />
				</h1>
				<div className={style.textPara}>
					<Skeleton enableAnimation={true} style={{ height: `20px` }} />
					<Skeleton enableAnimation={true} style={{ height: `17px` }}></Skeleton>
				</div>
			</div>
			<div className={style.btn}>
				<Skeleton style={{ height: `32px`, borderRadius: `50px` }} />
			</div>
		</div>
	);
};

export default SkeletonCard;
