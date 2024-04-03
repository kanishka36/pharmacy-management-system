import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { customerRegister, userLogin } from "../api/auth.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const registerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    conformPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginInitialValues = {
    email: "",
    password: "",
  };
  const registerInitialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    conformPassword: "",
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); //for login
  const [regBtnLoading, setRegBtnLoading] = useState(false); //for register
  const [regError, setRegError] = useState(null); //for register
  const navigate = useNavigate();

  const handleLoginSubmit = async (values, action) => {
    try {
      dispatch(loginStart());
      const response = await userLogin(values);
      navigate("/");
      dispatch(loginSuccess(response));
    } catch (error) {
      dispatch(loginFailure(error));
    }
    action.setSubmitting(false);
    action.resetForm();
  };

  const handleRegisterSubmit = async (values, action) => {
    try {
      setRegBtnLoading(true);
      const response = await customerRegister(values);
      setRegBtnLoading(false);
    } catch (error) {
      setRegBtnLoading(false);
      setRegError(error);
    }
    action.setSubmitting(false);
    action.resetForm();
  };

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-16 m-3 font-poppins my-20">
        <div className="login w-full p-3">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
            Login
          </h2>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                  >
                    {loading ? "Loading" : "Log in"}
                  </button>
                </div>
                {error && <p className="text-red-500 mt-3">{error}</p>}
              </Form>
            )}
          </Formik>
        </div>
        {/* Register */}
        <div className="register w-full p-3">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
            Register
          </h2>
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="flex flex-col md:flex-row w-full gap-3">
                  <div className="flex flex-col w-full">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                        touched.firstName && errors.firstName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                        touched.lastName && errors.lastName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.phone && errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="conformPassword">Conform Password</label>
                  <Field
                    type="password"
                    name="conformPassword"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.conformPassword && errors.conformPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="conformPassword"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={regBtnLoading}
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                >
                  {regBtnLoading ? "Loading..." : "Register"}
                </button>
                {regError && <p className="text-red-500 mt-3">{regError}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
