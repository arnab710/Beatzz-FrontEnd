import style from "./Login.module.css";
import Logo from "../../Components/Logo/Logo";
import { MdOutlineEmail } from "react-icons/md";
import { RxLockClosed } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import Input from "../../Components/Input/Input";
import { Link, useLocation } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import SmallSpinner from "../../Components/SmallSpinner/SmallSpinner";

const Login = () => {
	const location = useLocation();

	useEffect(() => {
		document.title = "Beatzz | Log In";
		return () => (document.title = "Beatzz | Leading in Sound");
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const emailID = useRef("");
	const { mutate, isLoading } = useLogin();
	const [passID, setPassID] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate({ email: emailID.current, password: passID });
	};

	return (
		<div className={style.loginBackground}>
			<Logo />
			<div className={style.login}>
				<p className={style.loginText}>Login</p>
				<form onSubmit={handleSubmit}>
					<div className={style.inputArea}>
						<Input ID={emailID} type="email" placeholder="Email">
							<MdOutlineEmail />
						</Input>
						<Input ID={setPassID} type="password" placeholder="Password" PassCheck="true" state={passID}>
							<RxLockClosed />
						</Input>
						<div className={style.buttonArea}>
							<button disabled={isLoading} type="submit" onSubmit={handleSubmit}>
								{isLoading ? (
									<p>
										<SmallSpinner />
									</p>
								) : (
									<p>GET STARTED</p>
								)}
							</button>
						</div>
					</div>
				</form>
				<p className={style.newJoinPara}>
					<span>
						{" "}
						New to Beatzz ?{" "}
						<Link className={style.signupLink} to="/sign-up" state={{ from: location.state?.from }}>
							{" "}
							Join Now
						</Link>{" "}
					</span>
				</p>
			</div>
		</div>
	);
};

export default Login;
