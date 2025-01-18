import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/register`, formData);
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
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
        <h2 className="mb-4 text-dark">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 fw-bold mb-3"
            style={{ borderRadius: "30px" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
