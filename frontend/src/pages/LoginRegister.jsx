import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { customerRegister } from "../api/auth";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
    confirmPassword: Yup.string()
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

  const handleLoginSubmit = (values, action) => {
    // Handle login form submission
    console.log(values);
  };

  const handleRegisterSubmit = async (values, action) => {
    try {
      const response = await customerRegister(values);
      console.log(response);
    } catch (error) {
      console.log(error);
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
                  <label htmlFor="loginUsername">Email</label>
                  <Field
                    type="text"
                    name="email"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="loginUsername"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="loginPassword">Password</label>
                  <Field
                    type="password"
                    name="loginPassword"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-3 ${
                      touched.loginPassword && errors.loginPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="loginPassword"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                  >
                    Log in
                  </button>
                </div>
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
                      touched.phone && errors.phone ? "border-red-500" : ""
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
                  <label htmlFor="conformPassword">Password</label>
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
                    name="password"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
