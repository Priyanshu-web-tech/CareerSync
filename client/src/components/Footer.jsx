import React from 'react';

function Footer() {
  return (
    <footer className="text-center text-gray-700 py-4">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} . All Rights Reserved.
        </p>
        <p>
          Made by <span className='text-teal-600'> Priyanshu</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
