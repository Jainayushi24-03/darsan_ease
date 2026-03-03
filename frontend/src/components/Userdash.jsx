import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";

// ✅ Use environment variable
const API_URL = import.meta.env.VITE_API_URL;

export default function Userdash() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [donations, setDonations] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [contactInfos, setContactInfos] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Get logged-in username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Save cart automatically
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ===============================
  // API CALLS
  // ===============================

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${API_URL}/donations`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchContactInfos = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContactInfos(response.data);
    } catch (error) {
      console.error('Error fetching contact infos:', error);
    }
  };

  useEffect(() => {
    if (selectedTemple) {
      fetchServices();
      fetchDonations();
      fetchAnnouncements();
      fetchContactInfos();
    }
  }, [selectedTemple]);

  // ===============================
  // CART LOGIC
  // ===============================

  const handleAddToCart = (service) => {
    const newItem = { ...service, temple: selectedTemple };

    const exists = cart.some(
      item => item.service === newItem.service && item.temple === newItem.temple
    );

    if (exists) {
      alert("Already in cart");
      return;
    }

    setCart([...cart, newItem]);
    alert("Added to cart");
  };

  const handleRemoveFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Select items first");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Darshan Ease - Booking Confirmation", 20, 20);

    doc.setFontSize(12);
    doc.text(`User: ${userName}`, 20, 35);

    let y = 45;

    selectedItems.forEach(index => {
      const item = cart[index];
      doc.text(`- ${item.service} (${item.temple}) - ₹${item.price}`, 20, y);
      y += 10;
    });

    const total = selectedItems.reduce(
      (sum, index) => sum + cart[index].price,
      0
    );

    doc.text(`Total: ₹${total}`, 20, y + 10);
    doc.save("booking_confirmation.pdf");

    alert("Checkout successful");
  };

  // ===============================
  // NAVIGATION
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/user-login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="flex flex-col min-h-screen">

      <header className="bg-orange-500 shadow-md p-4">
        <div className="container mx-auto flex justify-between">

          <h1 className="text-white font-bold text-xl">
            Darshan Ease {selectedTemple ? `- ${selectedTemple}` : ""}
          </h1>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white text-orange-500 px-4 py-2 rounded"
            >
              {userName || "User"}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded shadow">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-orange-500 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">
          Welcome, {userName}
        </h2>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2023 Darshan Ease
      </footer>

    </div>
  );
}