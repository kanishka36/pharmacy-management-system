import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NotificationHandling = () => {
  const validationSchema = Yup.object().shape({
    header: Yup.string().required("Required"),
    body: Yup.string().required("Required"),
  });

  const newsInitialValues = {
    header: "",
    body: "",
  };
  const notificationValidationSchema = Yup.object().shape({
    body: Yup.string().required("Required"),
  });

  const notificationInitialValues = {
    body: "",
  };

  const handleSubmit = async (values, actions) => {};
  const handleSubmitNotification = async (values, actions) => {};
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Notification Handling
          </h1>
          <div className="bg-white container m-8 p-8 rounded-md">
            <Formik
              initialValues={newsInitialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="flex flex-col">
                    <h2 className="text-indigo-600 text-2xl font-semibold mb-3">
                      Add News
                    </h2>
                    <div className="flex flex-col gap-1">
                      <div className="basis-1/2">
                        <div className="flex flex-col">
                          <label>Header:</label>
                          <Field
                            type="text"
                            name="header"
                            className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                              touched.header && errors.header
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="header"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="basis-1/2">
                        <div className="flex flex-col">
                          <label>Body</label>
                          <Field
                            type="text"
                            name="body"
                            className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                              touched.body && errors.body
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="body"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <button type="submit" className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4">Submit</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="bg-white container m-8 p-8 rounded-md">
            <Formik
              initialValues={notificationInitialValues}
              validationSchema={notificationValidationSchema}
              onSubmit={handleSubmitNotification}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="flex flex-col">
                    <h2 className="text-indigo-600 text-2xl font-semibold mb-3">
                      Add Notification
                    </h2>
                    <div className="flex flex-col gap-1">
                      <div className="basis-1/2">
                        <div className="flex flex-col">
                          <label>Body Of Notification:</label>
                          <Field
                            type="text"
                            name="body"
                            className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                              touched.body && errors.body
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="body"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4">Submit</button>

                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationHandling;
