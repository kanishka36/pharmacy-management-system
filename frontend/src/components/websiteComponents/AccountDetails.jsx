import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { displayCustomer } from "../../api/customer";


const AccountDetails = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [data, setData] = useState([]);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    conformPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    conformPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegisterSubmit = async (values, action) => {
    try {
      setBtnLoading(true);
      const response = await customerRegister(values);
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      setError(error);
    }
    action.setSubmitting(false);
    action.resetForm();
  };

  //fetch customer
  const fetchCustomer = async () => {
    try {
      const response = await displayCustomer();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      <div className="register w-full p-3">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
          Account Details
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                    touched.password && errors.password ? "border-red-500" : ""
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
                disabled={btnLoading}
                className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
              >
                {btnLoading ? "Loading..." : "Save Changes"}
              </button>
              {Error && <p className="text-red-500 mt-3">{Error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AccountDetails;
