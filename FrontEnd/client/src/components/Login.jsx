import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (userData && userData.message && loginForm.otp === userData.message) {
      try {
        const res = await axios.post(
          "http://localhost:3000/login",
          loginForm
        );

        if (res.data.message === "Login successful.") {
          navigate("/Home", {
            state: {
              user: {
                name: res.data.user.name,
                email: res.data.user.email,
              },
            },
          });
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("OTP not matched");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Redirect to the signup page after 3 minutes
      navigate("/signup");
    }
  }, [timer, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="border p-4 rounded">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginInputChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginInputChange}
              className="form-control"
            />
          </div>

          {userData && userData.message && (
            <div className="mb-3">
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={loginForm.otp}
                onChange={handleLoginInputChange}
                className="form-control"
              />
              <div className="mt-2 text-center">
          <p>Try again in: {formatTime(timer)}</p><br />
          <Link to="/signup">Sign up</Link>
        </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
