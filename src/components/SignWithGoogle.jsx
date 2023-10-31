import { useState } from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export function SignWithGoogle() {
  const [signInStatus, setSignInStatus] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      if (result) {
        setSignInStatus("success");
        navigate("/main");
      } else {
        setSignInStatus("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signInWithGoogleForm">
      <button onClick={signInWithGoogle} className="signInBtn">
        Sign In With Google
      </button>
      <h1>{signInStatus}</h1>
    </div>
  );
}
