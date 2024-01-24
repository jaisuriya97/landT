import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/register', registerForm);
      const userData = res.data;
      navigate('/login', { state: { userData } });
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <div className="border rounded p-4">
          <h1 className="text-3xl font-bold mb-4">Registration</h1>

          <form onSubmit={handleRegisterSubmit}>
            <input type="text" name="name" placeholder="Name" value={registerForm.name} onChange={handleRegisterInputChange} className="form-control mb-2" />
            <input type="email" name="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterInputChange} className="form-control mb-2" />
            <input type="password" name="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterInputChange} className="form-control mb-2" />
            <button type="submit" className="btn btn-primary btn-block mt-3">Register</button><br />
            <Link to="/login">login</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup