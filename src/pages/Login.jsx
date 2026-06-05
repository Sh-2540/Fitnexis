import { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = () => signInWithPopup(auth, provider);

  const login = () =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = () =>
    createUserWithEmailAndPassword(auth, email, password);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome </h2>
        <p>Login to continue</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        <button className="secondary-btn" onClick={signup}>
          Sign Up
        </button>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={googleLogin}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}