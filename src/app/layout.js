'use client' 
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import '../styles/app.scss';
import Header from './components/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in using localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    if (loggedInStatus === 'true' && loginTimestamp) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // If login timestamp is within the last week, set the state to true
      if (new Date(loginTimestamp) > weekAgo) {
        setIsLoggedIn(true);
      }
    }

    if (!isLoggedIn) {
      // If user is not logged in or login is expired, prompt for login
      const login = () => {
        const envUsername = process.env.NEXT_PUBLIC_USERNAME; 
        const envPassword = process.env.NEXT_PUBLIC_PASSWORD; 

        let isLoggedIn = false;

        while (!isLoggedIn) {
          const username = prompt("Enter your username:");
          const password = prompt("Enter your password:");

          if (username === envUsername && password === envPassword) {
            alert("Login successful!");
            isLoggedIn = true;
          } else {
            alert("Invalid username or password. Please try again.");
          }
        }

        // Store login state and timestamp in localStorage
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('loginTimestamp', new Date());
        setIsLoggedIn(isLoggedIn);
      };

      login();
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {/* Render children only if user is logged in */}
        {isLoggedIn && children}
      </body>
    </html>
  );
}
