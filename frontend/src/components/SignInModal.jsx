import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SocialLoginButton = () => (
  <Fragment>
    <button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faFacebook} className="mr-2 text-white" />
      <span>Continue with Facebook</span>
    </button>
    <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faGoogle} className="mr-2 text-white" />
      <span>Continue with Google</span>
    </button>
  </Fragment>
);

const SignInModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto bg-white bg-opacity-30 backdrop-blur-xl text-indigo-900 rounded-2xl p-8 shadow-xl border border-white border-opacity-20">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-xl font-bold hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-800 hover:bg-indigo-900 py-3 rounded-lg font-semibold text-white transition"
          >
            Log In
          </button>
        </form>

        <button className="w-full mt-4 text-sm text-white hover:underline">
          Forgot your password?
        </button>

        <div className="relative mt-8">
          <hr className="border-white border-opacity-30" />
          <span className="absolute px-2 bg-white bg-opacity-20 text-white text-sm left-1/2 -translate-x-1/2 -top-3">
            or
          </span>
        </div>

        <SocialLoginButton />

        <div className="text-center mt-6">
          <p className="text-sm text-white/60">Don’t have an account?</p>
          <a href="#" className="font-medium text-white hover:underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
