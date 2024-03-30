import React, { useState } from "react";
import Menu from "../components/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Products = [
  {
    code: 1,
    product: "panadol",
    category: "painkiller",
    exp: "2020.02.10",
    actualPrice: 20,
    sellPrice: 30,
    profit: 10,
  },
  {
    code: 1,
    product: "panadol",
    category: "painkiller",
    exp: "2020.02.10",
    actualPrice: 20,
    sellPrice: 30,
    profit: 10,
  },
  {
    code: 1,
    product: "panadol",
    category: "painkiller",
    exp: "2020.02.10",
    actualPrice: 20,
    sellPrice: 30,
    profit: 10,
  },
  {
    code: 1,
    product: "panadol",
    category: "painkiller",
    exp: "2020.02.10",
    actualPrice: 20,
    sellPrice: 30,
    profit: 10,
  },
];

const Category = ["painkillers", "painkillers", "painkillers", "painkillers"];

const StockManage = () => {
  const validationSchema = Yup.object({
    barcode: Yup.string().required("Required"),
    productName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    actualPrice: Yup.string().required("Required"),
    sellingPrice: Yup.string().required("Required"),
  });
  const [showPopup, setShowPopup] = useState(false);

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

  const handleAddItem = (values, actions) => {
    console.log(values);
  };

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
                  className="border-solid border border-indigo-600 rounded-full px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  type="text"
                  name="medicine"
                  placeholder="Medicine"
                  className="border-solid border border-indigo-600 rounded-full px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  as="select"
                  name="category"
                  className="border-solid border border-indigo-600 rounded-full px-3 py-1 mr-1 mb-2 lg:mb-0"
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
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 mr-1 rounded-full text-white font-semibold transition-all duration-100 ease-in mb-2 lg:mb-0"
                >
                  Search
                </button>
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-full text-white font-semibold transition-all duration-100 ease-in"
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
                {Products.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {product.code}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.product}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.category}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.exp}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.actualPrice}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.sellPrice}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {product.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* add product form  */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
              <div className="bg-white w-1/3 p-8 rounded-md">
                <Formik
                  initialValues={addItemInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleAddItem}
                >
                  <Form>
                    <div className="flex flex-col">
                      <h2>Add Product</h2>
                      <div className="flex">
                        <label>Bar Code:</label>
                        <Field type="text" name="barcode" className="border" />
                      </div>
                      <ErrorMessage
                        name="barcode"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Product Name:</label>
                        <Field
                          type="text"
                          name="productName"
                          className="border"
                        />
                      </div>
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Category:</label>
                        <Field type="text" name="category" className="border" />
                      </div>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Expre Date:</label>
                        <Field
                          type="text"
                          name="expreDate"
                          className="border"
                        />
                      </div>
                      <ErrorMessage
                        name="expreDate"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Quantity:</label>
                        <Field type="text" name="quantity" className="border" />
                      </div>
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Actual Price:</label>
                        <Field
                          type="text"
                          name="actualPrice"
                          className="border"
                        />
                      </div>
                      <ErrorMessage
                        name="actualPrice"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Selling Price:</label>
                        <Field
                          type="text"
                          name="sellingPrice"
                          className="border"
                        />
                      </div>
                      <ErrorMessage
                        name="sellingPrice"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <label>Profit:</label>
                        <Field type="text" name="profit" className="border" />
                      </div>
                      <ErrorMessage
                        name="profit"
                        component="div"
                        className="text-red-600"
                      />
                      <div className="flex">
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                        >
                          Add Item
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
                <button
                  onClick={() => setShowPopup(false)} // Hide popup when button is clicked
                  className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockManage;
