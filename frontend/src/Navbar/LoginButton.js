import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const customRedirectUri = "http://localhost:3000/newuser"; // Make sure it matches your route

  return (
    <div className="login-button">
        <button onClick={() => loginWithRedirect({ redirect_uri: customRedirectUri })}>Log In</button>
    </div>)
  
};

export default LoginButton;