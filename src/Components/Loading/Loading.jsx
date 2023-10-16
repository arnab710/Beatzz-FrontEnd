import ReactLoading from "react-loading";
import style from "./Loading.module.css";

const loading = ({ styled = "" }) => (
	<span className={`${styled ? styled : style.loader}`}>
		<ReactLoading type={`spin`} color={`rgba(14, 165, 165, 0.752)`} />
	</span>
);

export default loading;
