import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { displayCategory, updateItem } from "../api/stock";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

const EditItem = ({ setShowPopup2, data, setItems }) => {
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [category, setCategory] = useState([])

  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required("Required"),
    productName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    actualPrice: Yup.string().required("Required"),
    sellingPrice: Yup.string().required("Required"),
  });

  const addItemInitialValues = {
    barcode: data.barcode,
    productName: data.productName,
    category: data.category,
    expreDate: data.expreDate,
    quantity: data.quantity,
    actualPrice: data.actualPrice,
    sellingPrice: data.sellingPrice,
    profit: "",
    image: data.image,
  };

  //add item
  const handleSubmit = async (values, actions) => {
    try {
      values.image = imgURL || data.image;
      await updateItem(values, data._id);
      //update display item row
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === data._id ? { ...item, ...values } : item
        )
      );
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
    filePercentage(null);
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

      //fetch category
      const fetchCategory = async () => {
        try {
          const response = await displayCategory()
          setCategory(response)
        } catch (error) {
          console.log(error)
        }
      }
  
      useEffect(()=> {
        fetchCategory();
      },[])

  return (
    <>
      <div className="bg-white container m-8 p-8 rounded-md">
        <Formik
          initialValues={addItemInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="flex flex-col">
                <h2 className="text-indigo-600 text-2xl font-semibold mb-3">
                  Edit Product
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
                        as="select"
                        name="category"
                        className={`border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 ${
                          touched.category && errors.category
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Select Category</option>
                        {category.map((category, index) => {
                          return (
                            <option key={index} value={category.category}>
                              {category.category}
                            </option>
                          );
                        })}
                      </Field>
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
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4 mr-3"
                  >
                    Update Item
                  </button>
                  <button
                    onClick={() => setShowPopup2(false)}
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

export default EditItem;
