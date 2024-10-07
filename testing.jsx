

"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate inputs
    if (!email || !password || !confirmPassword ) {
      setError('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Send registration request
    try {
      const res =  fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        email,
        password,
        
      }),
    });
       if (res.ok) {
      const form = e.target;
      toast.success("susscesfully registered")
      form.reset();
      router.push("/");
      }
      else {
      console.log("User registration failed.");
    }
  } catch (error) {
    console.log("Error during registration: ", error);
  }

    

    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleRegister} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

        
        <input
          type="email"
          placeholder="Email"
          className="border rounded w-full p-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded w-full p-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded w-full p-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
          
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold rounded w-full p-3 hover:bg-blue-600 transition-all duration-300 text-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}