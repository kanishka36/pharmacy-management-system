import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userRegister } from "../../api/auth.js";

const Category = ["pharmacist", "stock keeper", "deliver partner", "cashier"];

const AddMember = ({ setShowPopup }) => {
  const registerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const registerInitialValues = {
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    password: "",
  };

  const handleAddMember = async (values, action) => {
    try {
      await userRegister(values);
      location.reload();
    } catch (error) {
      console.log(error);
    }
    action.setSubmitting(false);
    action.resetForm();
  };

  return (
    <>
      <div className="container bg-white rounded-md p-3">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
          Add Member
        </h2>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleAddMember}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="flex flex-col md:flex-row w-full gap-3">
                <div className="flex flex-col w-full">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
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
                    className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
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
                <Field
                  as="select"
                  name="role"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 mt-3"
                >
                  <option value="">Select Role</option>
                  {Category.map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
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
                  className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4 mr-3"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddMember;
