import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

export default function SignUp() {
  const theme = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
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
          <input
            type="password"
            placeholder="password"
            className="border p-3 text-black  rounded-lg"
            id="password"
            onChange={handleChange}
          />

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
