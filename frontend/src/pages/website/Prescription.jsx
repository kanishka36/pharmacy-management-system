import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import guidImg from "../../assets/images/slider1.jpg";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addPrescription } from "../../api/prescription";

const Prescription = () => {
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [message, setMessage] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number().required("Age is required").positive("Invalid age"),
    contactNo: Yup.string().required("Contact number is required"),
    deliveryAddress: Yup.string().required("Delivery address is required"),
    note: Yup.string(),
  });

  const initialValues = {
    name: "",
    email: "",
    age: "",
    contactNo: "",
    deliveryAddress: "",
    note: "",
    image: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      values.image = imgURL;
      const response = await addPrescription(values);
      setImgURL("");
      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    } else {
      console.log("No image selected");
    }
  };

  const handleImageUpload = async (e) => {
    try {
      if (file && !imgURL) {
        const url = await storeImage(file);
        setImgURL(url);
        setFileUploadError(false);
        setFilePercentage(null);
      }
    } catch (error) {
      console.log(error);
      setFileUploadError("Image upload failed (2 mb max per image)");
    }
  };

  const handleRemoveImg = () => {
    setImgURL("");
    setFile(null);
    setFilePercentage(null);
  };

  //store image in firebase
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
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
              <div className="flex flex-col">
                <label>Note:</label>
                <Field
                  type="text"
                  name="note"
                  className={`w-full border-solid border border-indigo-600 rounded-md px-3 py-1 mt-1 mb-3 ${
                    touched.note && errors.note ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>Add Image:</label>

                <div className="relative">
                  <label
                    htmlFor="image"
                    className="border border-indigo-500 px-2 py-1 rounded-md"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-28 h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md bg-green-600 text-white font-semibold ml-6"
                    onClick={handleImageUpload}
                  >
                    Upload
                  </button>
                </div>
                <p className="text-red-600">
                  {fileUploadError && fileUploadError}
                </p>
                <p>
                  {filePercentage > 0 && filePercentage < 100 ? (
                    <span>{`Uploading ${filePercentage}%`}</span>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  {file && imgURL ? (
                    <span className="text-green-600">
                      Image seccussful uploaded
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                {imgURL.length > 0 ? (
                  <div className="flex pt-3">
                    <img
                      className="w-40 h-30 object-contain rounded-lg mr-3"
                      src={imgURL}
                    />
                    <button
                      type="button"
                      className="text-red-600 uppercase"
                      onClick={() => handleRemoveImg()}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 mt-3 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                >
                  SUBMIT
                </button>
              </div>
              <div className="text-center text-green-600 mt-2">{message}</div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Prescription;
