import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>
      <p>Please contact the admin or use your registered email to reset your password.</p>
      <Link to="/">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
