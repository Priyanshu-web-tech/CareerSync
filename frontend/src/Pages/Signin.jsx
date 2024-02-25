import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import icons from React Icons

import {
  signInStart,
  signInFailure,
  signInSuccess,
  clearError,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const theme = useSelector((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    return () => {
      clearErrorMessage();
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme.darkMode ? "dark:bg-slate-700 text-white" : "text-black"
      }`}
    >
      <div
        className={`shadow-lg rounded p-8 max-w-md w-full ${
          theme.darkMode ? "dark:bg-slate-800" : ""
        }`}
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-teal-800">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg py-3 px-4 text-black focus:outline-none focus:border-teal-800"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full text-black border rounded-lg py-3 px-4 focus:outline-none focus:border-teal-800 pr-12"
              id="password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute  inset-y-0 right-0 px-3 py-2 text-teal-800 focus:outline-none"
            >
              {showPassword ? <RiEyeOffFill size={24} /> : <RiEyeFill size={24} />}{" "}
              {/* Use React Icons */}
            </button>
          </div>
          <button
            disabled={loading}
            className="w-full bg-teal-800 text-white py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="mr-1">Don't have an account?</p>
          <Link
            to={"/sign-up"}
            className="text-teal-800 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
}
