import React, { useState } from "react";
import Menu from "../../components/Menu.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userRegister } from "../../api/auth.js";

const Staff = [
  {
    id: 1,
    name: "member1",
    role: "stock keeper",
  },
  {
    id: 2,
    name: "member1",
    role: "pharmasist",
  },
  {
    id: 3,
    name: "member1",
    role: "deliver partner",
  },
  {
    id: 4,
    name: "member1",
    role: "cashier",
  },
];

const Category = ["pharmacist", "stock keeper", "deliver partner", "cashier"];

const StaffManage = () => {
  const registerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const [showPopup, setShowPopup] = useState(false);

  const searchInitialValues = {
    id: "",
    name: "",
    role: "",
  };

  const registerInitialValues = {
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {};

  const handleAddItemPopup = () => {
    setShowPopup(true); // Show popup when "Add Item" button is clicked
  };

  const handleAddMember = async (values, action) => {
    try {
      const response = await userRegister(values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    action.setSubmitting(false);
    action.resetForm();
  };

  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Staff Manage
          </h1>
          <Formik initialValues={searchInitialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="flex lg:flex-row flex-col mx-3">
                <Field
                  type="text"
                  name="id"
                  placeholder="Member ID"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  as="select"
                  name="role"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
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

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 mr-1 rounded-md text-white font-semibold transition-all duration-100 ease-in mb-2 lg:mb-0"
                >
                  Search
                </button>
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                  onClick={handleAddItemPopup}
                >
                  Add New Member
                </button>
              </div>
            </Form>
          </Formik>
          {/* table of product details  */}
          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full border border-indigo-600">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Member ID
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Name
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {Staff.map((member, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {member.id}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {member.name}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {member.role}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      <button>See More</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* add product form  */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
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
                            touched.phone && errors.phone
                              ? "border-red-500"
                              : ""
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
                            touched.email && errors.email
                              ? "border-red-500"
                              : ""
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StaffManage;
