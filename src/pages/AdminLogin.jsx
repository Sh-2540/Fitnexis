import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (
      password === "Fitnexis@2026"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin-orders");

    } else {

      alert("Wrong Password");
    }
  };

  return (

    <div
      style={{
        padding: "100px 20px",
        textAlign: "center"
      }}
    >

      <h1>
        Admin Login
      </h1>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <br /><br />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default AdminLogin;