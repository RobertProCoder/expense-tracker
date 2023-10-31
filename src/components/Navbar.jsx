import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
export function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signOutUser = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src={user?.photoURL} alt="" className="userImage" />
      <button onClick={signOutUser} className="signOutBtn">
        SignOut
      </button>
    </div> 
  );
}
