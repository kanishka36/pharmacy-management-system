import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Formik, Form, Field } from "formik";
import { displayItem } from "../../api/stock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddItem from "../../components/AddItem";

const Category = ["painkillers", "painkillers", "painkillers", "painkillers"];

const StockManage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState([]);

  const searchInitialValues = {
    barcode: "",
    medicine: "",
    category: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  const handleAddItemPopup = () => {
    setShowPopup(true); // Show popup when "Add Item" button is clicked
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
              <AddItem setShowPopup={setShowPopup} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockManage;
