import React from "react";

const LoginRegister = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-16 m-3 font-poppins my-20">
        <div className="login w-full p-3">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
            Login
          </h2>
          <form>
            <div className="flex flex-col">
              <label>Username or email address</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
        {/* Register */}
        <div className="regiter w-full p-3">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
            Register
          </h2>
          <div className="flex flex-col md:flex-row w-full gap-3">
            <div className="flex flex-col w-full">
              <label>First Name</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Last Name</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Phone</label>
            <input
              type="text"
              className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
            />
          </div>
          <div className="flex flex-col">
            <label>Email Address</label>
            <input
              type="email"
              className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in">
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
