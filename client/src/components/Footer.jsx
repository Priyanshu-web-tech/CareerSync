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
      className={`xl:px-24 p-8  w-full ${
        theme.darkMode
          ? "dark:bg-gray-800 text-gray-400"
          : "bg-neutral-100 text-gray-700"
      }`}
    >
      <div className="flex justify-between text-left">
        <div>
          <h4 className="text-xl lg:text-3xl font-semibold">
            Let's get in touch!
          </h4>

          <div className={"mt-4 lg:mb-0  flex space-x-4"}>
            <a
              href="https://www.instagram.com/__priyanshu.sharma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className={`hover:text-teal-400 transition duration-300`}
              />
            </a>
            <a
              href="https://github.com/Priyanshu-web-tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                className={`hover:text-teal-400 transition duration-300`}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className={`hover:text-teal-400 transition duration-300`}
              />
            </a>
            <a
              href="https://priyanshu-sharma-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUser
                className={`hover:text-teal-400 transition duration-300`}
              />
            </a>
          </div>
        </div>

        <div>
          <ul className="list-unstyled  gap-4 flex justify-end">
            <li>
              <Link
                className=" mt-1  0 font-semibold  pb-1 text-sm"
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className=" mt-1  0 font-semibold  pb-1 text-sm"
                to="/sign-up"
              >
                Sign up
              </Link>
            </li>

            <li>
              <button onClick={scrollToTop} className="focus:outline-none">
                <FaArrowCircleUp className=" text-teal-600 text-3xl hover:text-teal-400 transition duration-300" />
              </button>
            </li>
          </ul>

          <div className="text-right  mt-4 lg:mt-2 lg:text-center">
            <div className="text-sm  font-semibold ">
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;