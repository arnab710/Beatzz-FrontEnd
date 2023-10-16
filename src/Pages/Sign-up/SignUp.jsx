import { useEffect, useRef, useState } from "react";
import style from "./SignUp.module.css";
import Logo from "../../Components/Logo/Logo";
import Input from "../../Components/Input/Input";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser, BiSolidError } from "react-icons/bi";
import { RxLockClosed } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import useCreateNewUser from "../../Hooks/useCreateNewUser";
import SmallSpinner from "../../Components/SmallSpinner/SmallSpinner";

const SignUp = () => {
	const userName = useRef("");
	const emailID = useRef("");
	const [passID, setPassID] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [err, setErr] = useState("");
	const location = useLocation();

	useEffect(() => {
		document.title = "Beatzz | Sign Up";
		return () => (document.title = "Beatzz | Leading in Sound");
	}, []);

	const { mutate, isLoading } = useCreateNewUser();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr("");
		if (passID !== confirmPass) return setErr("The password confirmation does not match");
		if (passID.length < 8) return setErr("Password must be atleast 8 characters long");

		mutate({ email: emailID.current, name: userName.current, password: passID, confirmpassword: confirmPass });
	};

	return (
		<div className={style.loginBackground}>
			<Logo />
			<div className={style.login}>
				<p className={style.loginText}>Signup</p>
				<form onSubmit={handleSubmit}>
					<div className={style.inputArea}>
						<Input ID={userName} type="text" placeholder="Full name">
							<BiUser />
						</Input>
						<Input ID={emailID} type="email" placeholder="Email">
							<MdOutlineEmail />
						</Input>
						<Input ID={setPassID} type="password" placeholder="Password" state={passID} PassCheck="true">
							<RxLockClosed />
						</Input>
						<Input ID={setConfirmPass} type="password" placeholder="Confirm password" state={confirmPass} PassCheck="true">
							<RxLockClosed />
						</Input>
						{err && (
							<p className={style.error}>
								<span>
									<BiSolidError />
								</span>{" "}
								{err}
							</p>
						)}
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
						Already have an account ?{" "}
						<Link className={style.loginLink} to="/login" state={{ from: location.state?.from }}>
							{" "}
							Login Now
						</Link>{" "}
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
