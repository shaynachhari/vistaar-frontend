import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { logout, setAuthData } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      setUserName(decoded.name);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container d-flex flex-column align-items-center vh-80 bg-light">
      <header className="d-flex justify-content-between align-items-center mb-5 w-100">
        <h1 className="fw-bold text-primary text-center w-100">
          Welcome to the Home Page
        </h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.removeItem("jwtToken");
            logout();
            setAuthData(null);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <div className="card p-5 shadow-lg w-75 text-center">
        {userId ? (
          <p
            className="text-dark fw-bold"
            style={{
              fontSize: "1.2rem",
              fontFamily: "Arial, sans-serif",
              marginBottom: "10px",
            }}
          >
            <span className="text-dark"> User Id : </span>{userId}
          </p>
        ) : (
          <p className="text-warning">No valid token found. Please log in again.</p>
        )}

        {userName ? (
          <p
            className="text-dark fw-bold"
            style={{
              fontSize: "1.2rem",
              fontFamily: "Arial, sans-serif",
              marginBottom: "20px",
            }}
          >
            <span className="text-dark"> User Name : </span>{userName}
          </p>
        ) : (
          <p className="text-warning">No valid token found. Please log in again.</p>
        )}

        {userId && userName && (
          <div className="mt-4">
            <Link to={"/dashboard"}>
              <button className="btn btn-primary btn-lg">
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
