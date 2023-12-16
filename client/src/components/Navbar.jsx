import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toggleTheme } from "../redux/theme/themeReducer";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
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
    <motion.header
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-screen-2xl  xl:px-12 px-4 ${
        theme.darkMode ? "dark:bg-slate-800 text-white" : ""
      }`}
    >
      <motion.nav
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-between items-center py-6"
      >
        {/* left */}
        <Link
          className="flex items-center gap-1 text-2xl font-semibold "
          to="/"
        >
          <motion.svg
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" fill="#0d9488" />
            <circle cx="50" cy="50" r="30" fill="#fff" />

            <path d="M70 70H30V60H70V70ZM60 50H40V30H60V50Z" fill="#0d9488" />
          </motion.svg>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            CareerSync
          </motion.span>
        </Link>

        {/* Nav items for large devices (mid part) */}
        <ul className="hidden lg:flex gap-8">
          {navItems.map(({ path, title }) => (
            <motion.li
              key={path}
              className="text-base py-1"
              whileHover={{ scale: 1.1 }}
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Sign up and login button (end part) */}
        <div className="text-base  font-medium space-x-5 hidden lg:flex items-center">
          <button
            className="flex items-center justify-center bg-gray-200 rounded-full p-2 focus:outline-none"
            onClick={handleToggle}
          >
            {theme.darkMode ? (
              <FaSun size={18} color="teal" />
            ) : (
              <FaMoon size={18} color="teal" />
            )}
          </button>

          <Link className="hover:text-teal-600" to="/">
            Home
          </Link>
          <Link className="hover:text-teal-600" to="/about">
            About
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <motion.img
                whileHover={{ scale: 1.1 }}
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="User Avatar"
              />
            ) : (
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-teal-600 hover:opacity-90 text-white py-2 px-5 border rounded"
              >
                Sign in
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden block">
          <motion.button
            className="focus:outline-none"
            whileHover={{ scale: 1.1 }}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Nav items for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -30 }}
        transition={{ duration: 0.5 }}
        className={`px-4  rounded-sm lg:hidden ${isMenuOpen ? "" : "hidden"} `}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <motion.li
              key={path}
              className="text-base py-1"
              whileHover={{ scale: 1.1 }}
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </motion.li>
          ))}

          <motion.li whileHover={{ scale: 1.1 }}>
            {" "}
            <Link className="hover:text-teal-600 text-base py-1" to="/">
              Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            {" "}
            <Link className="hover:text-teal-600 text-base py-1" to="/about">
              About
            </Link>
          </motion.li>
          <li>
            <button
              className="flex items-center justify-center bg-gray-200 rounded-full p-2 focus:outline-none"
              onClick={handleToggle}
            >
              {theme.darkMode ? (
                <FaSun size={18} color="teal" />
              ) : (
                <FaMoon size={18} color="teal" />
              )}
            </button>{" "}
          </li>
          <motion.li className="py-1" whileHover={{ scale: 1.1 }}>
            <Link to="/profile">
              {currentUser ? (
                <motion.img
                  className="rounded-full h-10 w-10 object-cover"
                  src={currentUser.avatar}
                  alt="User Avatar"
                />
              ) : (
                <span className="text-base py-1">Sign in</span>
              )}
            </Link>
          </motion.li>
        </ul>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
