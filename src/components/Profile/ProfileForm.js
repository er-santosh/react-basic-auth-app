import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ProfileForm.module.css";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const idToken = useSelector((state) => state.auth.access_token);

  const navigate = useNavigate();

  const newPassRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const password = newPassRef.current.value;

    if (password === "") return;
    setIsLoading(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
          toast.success("Password updated");
          navigate("/", { replace: true });
        }
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button>
          Change Password
          <PulseLoader loading={isLoading} color={"#FFFF"} size={10} />
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
