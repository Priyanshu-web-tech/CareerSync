import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaArrowCircleUp,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaUser,
} from "react-icons/fa";

function Footer() {
  const theme = useSelector((state) => state.theme);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`xl:px-24 px-4 p-5  w-full ${
        theme.darkMode ? "dark:bg-gray-800 text-white" : "bg-neutral-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-6/12  px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              Let's get in touch!
            </h4>
            <h5 className="text-md mt-0 mb-2 text-blueGray-600">
              Connecting talents with opportunities!
            </h5>
            <div className="mt-4 lg:mb-0  flex space-x-4 ">
              <a
                href="https://www.instagram.com/__priyanshu.sharma/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300" />
              </a>
              <a
                href="https://github.com/Priyanshu-web-tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300" />
              </a>
              <a
                href="https://priyanshu-sharma-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaUser className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300" />
              </a>
            </div>
          </div>
          <div className="w-6/12  px-4">
            <div className="flex justify-end items-top">
              <div className="w-4/12  px-4">
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-1 text-sm"
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-1 text-sm"
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={scrollToTop}
                      className="focus:outline-none"
                    >
                      <FaArrowCircleUp className="text-teal-600 text-3xl hover:text-teal-400 transition duration-300" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold ">
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
              <p>
                Made with ❤️ by <span className="text-teal-600">Priyanshu</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
