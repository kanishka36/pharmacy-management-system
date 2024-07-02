import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addNews, displayNews } from "../../api/news";
import { addNotification, displayNotification } from "../../api/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const NotificationHandling = () => {
  const [news, setNews] = useState([]);
  const [notification, setNotifinotification] = useState([]);

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

  const handleSubmitNews = async (values, actions) => {
    try {
      await addNews(values);
      location.reload();
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const handleSubmitNotification = async (values, actions) => {
    try {
      await addNotification(values);
      location.reload();
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const fetchNews = async () => {
    try {
      const response = await displayNews();
      setNews(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotification = async () => {
    try {
      const response = await displayNotification();
      setNotifinotification(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchNotification();
  }, []);
  
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Notification Handling
          </h1>
          <div className="bg-white container m-1 p-1 rounded-md">
            <Formik
              initialValues={newsInitialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmitNews}
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
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="bg-white container m-1 p-1 rounded-md">
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
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* News Table  */}
          <h1 className="text-lg font-medium text-indigo-600 my-3 ml-3">News History</h1>

          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Header
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Body
                  </th>
                </tr>
              </thead>
              <tbody>
                {news.map((news, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {news.header}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {news.body}
                    </td>
                    <td className="border border-indigo-600">
                      <button
                        type="button"
                        // onClick={() => handleEditMemberPopup(member._id)}
                        className="text-indigo-600 mr-1"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        type="button"
                        // onClick={() => handleDeleteMember(member._id)}
                        className="text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notification Table  */}
          <h1 className="text-lg font-medium text-indigo-600 my-3 ml-3">Notification History</h1>
          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Body
                  </th>
                </tr>
              </thead>
              <tbody>
                {notification.map((notification, index) => (
                  <tr key={index} className="text-center">
                   
                    <td className="border border-indigo-600 py-1">
                      {notification.body}
                    </td>
                    <td className="border border-indigo-600">
                      <button
                        type="button"
                        // onClick={() => handleEditMemberPopup(member._id)}
                        className="text-indigo-600 mr-1"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        type="button"
                        // onClick={() => handleDeleteMember(member._id)}
                        className="text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationHandling;
