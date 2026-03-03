import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaLock, FaBolt, FaSmile, FaShieldAlt } from 'react-icons/fa';

// ✅ Use Environment Variable
const API_URL = import.meta.env.VITE_API_URL;

export default function Dblogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [templeName, setTempleName] = useState("");
  const [availableTemples, setAvailableTemples] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableTemples();
  }, []);

  const fetchAvailableTemples = async () => {
    try {
      const response = await axios.get(`${API_URL}/availableTemples`);
      setAvailableTemples(response.data);
    } catch (error) {
      console.error('Error fetching available temples:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/templelogin`,
        { email, password, templeName }
      );

      alert(response.data.message);

      if (response.data.user) {
        localStorage.setItem('templeRepName', response.data.user.name);
        localStorage.setItem('templeName', response.data.user.tname);
        navigate('/db-dash');
      }

    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const switchToSignup = () => {
    navigate('/db-signup');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img className="h-10 w-auto" src="/pictures/pngaaa.com-1646422.png" alt="Hindu logo"/>
            <p className="ml-2 text-xl font-semibold text-orange-500">Darshan Ease</p>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light">
              Login/Signup Options
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-gray-700">
              <Dropdown.Item onClick={() => navigate('/user-login')}>
                Login as User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/login')}>
                Login as Admin
              </Dropdown.Item>
              <Dropdown.Item onClick={switchToSignup}>
                Sign-up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            Temple Administrative Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Email address
              </label>
              <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                <FaUserCircle className="text-gray-500 ml-3" />
                <input
                  type="email"
                  className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                <FaLock className="text-gray-500 ml-3" />
                <input
                  type="password"
                  className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-500 py-4 text-center">
        <p>&copy; 2023 Darshan Ease. All rights reserved.</p>
      </footer>
    </div>
  );
}