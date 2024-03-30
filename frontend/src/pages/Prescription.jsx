import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import guidImg from "../assets/images/slider1.jpg";

const Prescription = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number().required("Age is required").positive("Invalid age"),
    contactNo: Yup.string().required("Contact number is required"),
    deliveryAddress: Yup.string().required("Delivery address is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    age: "",
    contactNo: "",
    deliveryAddress: "",
  };

  const handleSubmit = (values, action) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto flex flex-col items-center font-poppins">
      <div className="w-full">
        <h1 className="text-6xl font-medium text-indigo-600 my-6 text-left">
          Upload your Prescription Now
        </h1>
      </div>
      <img src={guidImg} alt="guid" />
      <p className="my-3 text-xl font-medium">
        Please Login or Register before you Send the Prescription under{" "}
        <a href="">My Account</a>. Refresh again
      </p>
      <div className="flex w-full md:w-1/2 my-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="w-full">
              <div className="flex flex-col">
                <label>Your Name:</label>
                <Field
                  type="text"
                  name="name"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.name && errors.name ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>Age:</label>
                <Field
                  type="text"
                  name="age"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.age && errors.age ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>Contact No:</label>
                <Field
                  type="text"
                  name="contactNo"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.contactNo && errors.contactNo
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="contactNo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>Delivery Address:</label>
                <Field
                  type="text"
                  name="deliveryAddress"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.deliveryAddress && errors.deliveryAddress
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="deliveryAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Prescription;
