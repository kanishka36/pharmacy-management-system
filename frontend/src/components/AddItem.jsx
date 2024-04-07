import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addItem } from "../api/stock.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

const AddItem = ({ setShowPopup }) => {
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imgURL, setImgURL] = useState("");
  console.log(filePercentage);
  console.log(fileUploadError);
  console.log(imgURL);

  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required("Required"),
    productName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    actualPrice: Yup.string().required("Required"),
    sellingPrice: Yup.string().required("Required"),
  });

  const addItemInitialValues = {
    barcode: "",
    productName: "",
    category: "",
    expreDate: "",
    quantity: "",
    actualPrice: "",
    sellingPrice: "",
    profit: "",
    image: "",
  };

  //add item
  const handleAddItem = async (values, actions) => {
    try {
      values.image = imgURL;
      const response = await addItem(values);
      console.log(response);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const handleImageSubmit = async (e) => {
    try {
      if (file) {
        const url = await storeImage(file);
        setImgURL(url);
        console.log(imgURL);
      }
    } catch (error) {
      console.log(error);
      setFileUploadError(true);
    }
  };

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

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    } else {
      console.log("No image selected");
    }
  };

  return (
    <>
      <div className="bg-white container m-8 p-8 rounded-md">
        <Formik
          initialValues={addItemInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddItem}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="flex flex-col">
                <h2 className="text-indigo-600 text-2xl font-semibold mb-3">
                  Add Product
                </h2>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Bar Code:</label>
                      <Field
                        type="text"
                        name="barcode"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.barcode && errors.barcode
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="barcode"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Product Name:</label>
                      <Field
                        type="text"
                        name="productName"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.productName && errors.productName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="productName"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Category:</label>
                      <Field
                        type="text"
                        name="category"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.category && errors.category
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Quantity:</label>
                      <Field
                        type="text"
                        name="quantity"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.quantity && errors.quantity
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Actual Price:</label>
                      <Field
                        type="text"
                        name="actualPrice"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.actualPrice && errors.actualPrice
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="actualPrice"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Selling Price:</label>
                      <Field
                        type="text"
                        name="sellingPrice"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.sellingPrice && errors.sellingPrice
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="sellingPrice"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-10">
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Profit:</label>
                      <Field
                        type="text"
                        name="profit"
                        className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 "
                      />
                    </div>
                    <ErrorMessage
                      name="profit"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Expre Date:</label>
                      <Field
                        type="text"
                        name="expreDate"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.expreDate && errors.expreDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="expreDate"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div className="basis-1/2">
                  <div className="flex flex-col">
                    <label>Add Image:</label>

                    <div className="">
                      <Field
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md bg-green-600 text-white font-semibold"
                        onClick={handleImageSubmit}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4 mr-3"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddItem;
