import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
    radio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store user data in an object
    const userData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      radio: formData.radio,
    };

    // Store the user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/todo");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Todo List</h1>
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
        <div>
          <h1>Create your Account</h1>
          <form onSubmit={handleSubmit} className="signup-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
              <label htmlFor="email">Email address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
              <label htmlFor="password">Confirm Password*</label>
              <input
                type="password"
                id="cnfpassword"
                name="cnfpassword"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
