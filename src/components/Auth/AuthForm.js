import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { authActions } from "../../store/auth-reducer";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // on form submit
  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;

    //validate

    setIsLoading(true);
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:authType?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    if (isLogin) {
      //login
      url = url.replace("authType", "signInWithPassword");
    } else {
      //signup
      url = url.replace("authType", "signUp");
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        let errorMsg = "Authentication failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
          toast.error(errorMsg);
        } else {
          dispatch(authActions.login(data));
          toast.success(
            `User ${isLogin ? "logged in" : "signed up"} successfully`
          );
          navigate("/", { replace: true });
        }
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passRef} />
        </div>
        <div className={classes.actions}>
          <button>
            {isLogin ? "Login" : "Create Account"}
            <PulseLoader loading={isLoading} color={"#FFFF"} size={10} />
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
