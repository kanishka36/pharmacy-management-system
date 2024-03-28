import React from "react";
import Menu from "../components/Menu";
import { Formik, Form, Field } from "formik";

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
  const searchInitialValues = {
    barcode: "",
    medicine: "",
    category: "",
  };

  const handleSubmit = (values, actions) => {
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
            {(formik) => (
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
                    disabled={formik.isSubmitting}
                  >
                    Search
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-full text-white font-semibold transition-all duration-100 ease-in"
                    disabled={formik.isSubmitting}
                  >
                    Add Item
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full border border-indigo-600">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 py-2">Code</th>
                  <th className="border-2 border-indigo-600 py-2">Product</th>
                  <th className="border-2 border-indigo-600 py-2">Category</th>
                  <th className="border-2 border-indigo-600 py-2">Expry</th>
                  <th className="border-2 border-indigo-600 py-2">
                    Actual Price
                  </th>
                  <th className="border-2 border-indigo-600 py-2">
                    Selling Price
                  </th>
                  <th className="border-2 border-indigo-600 py-2">Profit</th>
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
        </div>
      </div>
    </>
  );
};

export default StockManage;
