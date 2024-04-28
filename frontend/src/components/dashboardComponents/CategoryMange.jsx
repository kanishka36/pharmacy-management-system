import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  addCategory,
  deleteCategory,
  displayCategory,
  updateCategory,
} from "../../api/stock.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddCategory = ({ setShowPopup3 }) => {
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
  });

  const [category, setCategory] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const addItemInitialValues = {
    category: "",
  };

  //add category
  const handleSubmit = async (values, actions) => {
    try {
      let res;
      if (!editCategory) {
        res = await addCategory(values);
        fetchCategory();
      } else {
        res = await updateCategory(values, categoryId);
        setEditCategory(false);
        fetchCategory();
      }
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  //edit category
  const handleEdit = (categoryId) => {
    setEditCategory(true);
    setCategoryId(categoryId);
  };

  //delete category
  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategory((prev) => prev.filter((cat) => cat._id !== categoryId));
    } catch (error) {
      console.log(error);
    }
  };

  //display category
  const fetchCategory = async () => {
    try {
      const response = await displayCategory();
      setCategory(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

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
                  Add New Category
                </h2>
                <div
                  className={`flex flex-col md:flex-row md:gap-10 ${
                    editCategory ? "hidden" : "block"
                  }`}
                >
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Category Name:</label>
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
                </div>
                <div
                  className={`flex flex-col md:flex-row md:gap-10 ${
                    editCategory ? "block" : "hidden"
                  }`}
                >
                  <div className="basis-1/2">
                    <div className="flex flex-col">
                      <label>Edit Category Name:</label>
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
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4 mr-3"
                  >
                    {editCategory ? "Update Item" : "Add Item"}
                  </button>
                  <button
                    onClick={() => setShowPopup3(false)}
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-md mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {/* table of product details  */}
        <div className="my-3 mx-3">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {category.map((category, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-indigo-600 py-1">
                    {category.category}
                  </td>
                  <td className="border border-indigo-600 py-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(category._id)}
                      className="text-indigo-600 mr-1"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category._id)}
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
    </>
  );
};

export default AddCategory;
