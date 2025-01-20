import React, { useState, useContext } from "react";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { apiURL } from "../utils/constants";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const googleLoginHandler = async (googleRes) => {
    const { credential } = googleRes;
    const token = credential;

    try {
      const res = await axios.post(`${apiURL}/auth/google`, {
        token: token
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = res.data;
      if (res.status !== 200) {
        alert("Error logging in with Google");
      } else {
        const jwtToken = data.token;
        localStorage.setItem('jwtToken', jwtToken);
        setAuthData({ token: jwtToken });
        navigate("/home");
      }
    } catch (error) {
      console.error("Error with Google login:", error);
      alert("Error logging in with Google");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}
    >
      <div
        className="card shadow-lg p-5 text-center"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '15px',
          background: 'white',
        }}
      >
        <h2 className="mb-4 text-dark">Login</h2>
        <form onSubmit={handleSubmit}>
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
            style={{ borderRadius: '30px' }}
          >
            Login
          </button>
          <GoogleLogin
            onSuccess={googleLoginHandler}
            onError={() => { console.log('Login Failed'); }}
          />
          <Link to="/signup" className="d-block mt-3">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg w-100 fw-bold"
              style={{ borderRadius: '30px' }}
            >
              Signup
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
