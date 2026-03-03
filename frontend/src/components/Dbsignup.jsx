import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { FaBolt, FaSmile, FaShieldAlt } from 'react-icons/fa';

// ✅ Use environment variable
const API_URL = import.meta.env.VITE_API_URL;

export default function Dbsignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [tname, setTname] = useState('');
  const [taddress, setTaddress] = useState('');

  const navigate = useNavigate();

  const switchToLogin = () => {
    navigate('/db-login');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile || !tname || !taddress) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const newTempleRep = {
        name,
        email,
        mobile,
        password,
        tname,
        taddress,
      };

      const response = await axios.post(
        `${API_URL}/templereps`,
        newTempleRep
      );

      alert("Signup successful!");
      navigate('/db-login');

      // Clear fields
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setTname('');
      setTaddress('');

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img className="h-10 w-auto" src="/pictures/pngaaa.com-1646422.png" alt="Hindu logo" />
            <p className="ml-2 text-xl font-semibold text-orange-500">
              Darshan Ease
            </p>
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="outline-light">
              Login/Signup Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/user-signup')}>
                Signup as User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/signup')}>
                Signup as Admin
              </Dropdown.Item>
              <Dropdown.Item onClick={switchToLogin}>
                Login
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            Temple Administrative Signup
          </h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 p-2 bg-gray-700 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 bg-gray-700 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile"
              className="w-full mb-3 p-2 bg-gray-700 rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 bg-gray-700 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="text"
              placeholder="Temple Name"
              className="w-full mb-3 p-2 bg-gray-700 rounded"
              value={tname}
              onChange={(e) => setTname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Temple Address"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={taddress}
              onChange={(e) => setTaddress(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm">
              Already registered?{" "}
              <button
                onClick={switchToLogin}
                className="text-orange-500 hover:underline"
              >
                Login
              </button>
            </span>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-500 py-4 text-center">
        <p>&copy; 2023 Darshan Ease. All rights reserved.</p>
      </footer>
    </div>
  );
}