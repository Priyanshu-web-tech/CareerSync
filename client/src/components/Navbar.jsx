import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link className="flex items-center gap-2 text-2xl text-black" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />

            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>CareerSync</span>
        </Link>

        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sign up and login button */}
        <div className="text-base tetx-primary font-medium space-x-5 hidden lg:block">
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="User Avatar"
              />
            ) : (
              <span className="bg-blue  text-white py-2 px-5 border rounded">
                Sign in
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Navitems for mobile */}
      <div
        className={`px-4  py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className=" py-1">
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="User Avatar"
              />
            ) : (
              <span className="text-base py-1">
                Sign in
              </span>
            )}
          </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
