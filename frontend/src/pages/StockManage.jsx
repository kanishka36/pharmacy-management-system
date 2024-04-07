import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addItem, displayItem } from "../api/stock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Category = ["painkillers", "painkillers", "painkillers", "painkillers"];

const StockManage = () => {
  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required("Required"),
    productName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    actualPrice: Yup.string().required("Required"),
    sellingPrice: Yup.string().required("Required"),
  });
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState([]);

  const searchInitialValues = {
    barcode: "",
    medicine: "",
    category: "",
  };

  const addItemInitialValues = {
    barcode: "",
    productName: "",
    category: "",
    expreDate: "",
    quantity: "",
    actualPrice: "",
    sellingPrice: "",
    profit: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  const handleAddItemPopup = () => {
    setShowPopup(true); // Show popup when "Add Item" button is clicked
  };

  //add item
  const handleAddItem = async (values, actions) => {
    try {
      const response = await addItem(values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };
  //display item
  const fetchItem = async () => {
    try {
      const response = await displayItem();
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Stock Manage
          </h1>
          <Formik initialValues={searchInitialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="flex lg:flex-row flex-col mx-3">
                <Field
                  type="text"
                  name="barcode"
                  placeholder="Enter Barcode"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  type="text"
                  name="medicine"
                  placeholder="Medicine"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  as="select"
                  name="category"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                >
                  <option value="">Select Category</option>
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
                  Add Item
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
                    Code
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Product
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Category
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Expry
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Actual Price
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Selling Price
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {item.barcode}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {item.productName}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {item.category}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {item.expreDate}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {item.actualPrice}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {item.sellingPrice}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {`${(item.sellingPrice - item.actualPrice) / 100}%`}
                    </td>
                    <td className="border border-indigo-600">
                      <button className="text-indigo-600 mr-1">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="text-red-600">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* add product form  */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
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
                            <Field type="file" name="image" accept="image/*" />
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockManage;
