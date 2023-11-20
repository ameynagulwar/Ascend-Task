import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUserData &&
      storedUserData.email === formData.email &&
      storedUserData.password === formData.password
    ) {
      nav("/todo");
    } else {
      nav("/signup");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "200px",
          marginLeft: "600px",
          padding: "8px",
          border: "1px solid gray",
          width: "300px",
        }}
      >
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email address"
              value={formData.email}
              onChange={handleChange}
              required
              width={"200px"}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="log-btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
