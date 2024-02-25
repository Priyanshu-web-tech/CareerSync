import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; 
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignUp() {
  const theme = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const [signInData, setsignInData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${window.location.origin}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      signInData.email = formData.email;
      signInData.password = formData.password;

      try {
        dispatch(signInStart());

        const res = await fetch(`${window.location.origin}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInData),
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
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
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
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="name"
            className="border p-3 text-black  rounded-lg"
            id="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="username"
            className="border p-3 text-black  rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 text-black  rounded-lg"
            id="email"
            onChange={handleChange}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="border w-full p-3 text-black  rounded-lg"
              id="password"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute  inset-y-0 right-0 px-3 py-2 text-teal-800 focus:outline-none"
            >
              {showPassword ? (
                <RiEyeOffFill size={24} />
              ) : (
                <RiEyeFill size={24} />
              )}{" "}
              {/* Use React Icons */}
            </button>
          </div>

          <button
            disabled={loading}
            className="bg-teal-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex  items-center justify-center gap-2 mt-5">
          <p>Have an account?</p>
          <Link
            className="text-teal-800 font-semibold hover:underline"
            to={"/sign-in"}
          >
            <span className="text-teal-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}