import React, { useState, useContext } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { apiURL } from "../utils/constants";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Signup successful!");
      navigate("/home");
    } catch (error) {
      console.error("Error signing up", error);
      alert("Signup failed!");
    }
  };

  const googleSignupHandler = async (googleRes) => {
    const { credential } = googleRes;
    const token = credential;

    try {
      const res = await axios.post(
        `${apiURL}/auth/google`,
        { token },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;
      if (res.status !== 200) {
        alert("Error signing up with Google");
      } else {
        const jwtToken = data.token;
        localStorage.setItem("jwtToken", jwtToken);
        setAuthData({ token: jwtToken });
        alert("Google Signup successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error with Google signup:", error);
      alert("Error signing up with Google");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)" }}
    >
      <div
        className="card shadow-lg p-5 text-center"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <h2 className="mb-4 text-dark">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 fw-bold mb-3"
            style={{ borderRadius: "30px" }}
          >
            Signup
          </button>
          <GoogleLogin
            onSuccess={googleSignupHandler}
            onError={() => {
              console.log("Signup Failed");
            }}
          />
          <Link to="/signup" className="d-block mt-3">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg w-100 fw-bold"
              style={{ borderRadius: "30px" }}
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
