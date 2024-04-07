'use client' 
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import '../styles/app.scss';
import Header from './components/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in using sessionStorage
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    const loginTimestamp = sessionStorage.getItem('loginTimestamp');

    if (loggedInStatus === 'true' && loginTimestamp) {
      const today = new Date();
      const lastLoginDate = new Date(loginTimestamp);

      // Check if last login was within the last day
      if (today - lastLoginDate <= 24 * 60 * 60 * 1000) {
        setIsLoggedIn(true);
      } else {
        // If last login was more than a day ago, clear sessionStorage
        sessionStorage.clear();
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

        // Store login state and timestamp in sessionStorage
        sessionStorage.setItem('isLoggedIn', isLoggedIn);
        sessionStorage.setItem('loginTimestamp', new Date());
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
