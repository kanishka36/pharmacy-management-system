import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu.jsx";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddMember from "../../components/dashboardComponents/AddMember.jsx";
import { deleteStaff, displayStaff, searchUser } from "../../api/staff.js";
import EditMember from "../../components/dashboardComponents/EditMember.jsx";

const Category = ["pharmacist", "stock keeper", "deliver partner", "cashier"];

const StaffManage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [staff, setStaff] = useState([]);
  const [showPopup2, setShowPopup2] = useState(false);
  const [data, setData] = useState();

  const searchInitialValues = {
    name: "",
    role: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await searchUser(values);
      setStaff(response);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  // Show popup when "Edit Icon" button is clicked
  const handleEditMemberPopup = (memberId) => {
    setShowPopup2(true);
    const selectedMember = staff.find((member) => member._id === memberId);
    setData(selectedMember);
  };

  //display staff
  const fetchStaff = async () => {
    try {
      const response = await displayStaff();
      setStaff(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddMemberPopup = () => {
    setShowPopup(true); // Show popup when "Add Member" button is clicked
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteStaff(memberId);
      setStaff((prev) => prev.filter((member) => member._id !== memberId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Staff Manage
          </h1>
          <Formik initialValues={searchInitialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="flex lg:flex-row flex-col mx-3">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                />

                <Field
                  as="select"
                  name="role"
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0"
                >
                  <option value="">Select Role</option>
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
                  onClick={handleAddMemberPopup}
                >
                  Add New Member
                </button>
              </div>
            </Form>
          </Formik>
          {/* table of product details  */}
          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Member ID
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Name
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {member._id}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {member.firstName + " " + member.lastName}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {member.role}
                    </td>
                    <td className="border border-indigo-600">
                      <button
                        type="button"
                        onClick={() => handleEditMemberPopup(member._id)}
                        className="text-indigo-600 mr-1"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMember(member._id)}
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

          {/* add staff member form  */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
              <AddMember setShowPopup={setShowPopup} setStaff={setStaff} />
            </div>
          )}
          {/* edit staff member form  */}
          {showPopup2 && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
              <EditMember
                setShowPopup2={setShowPopup2}
                data={data}
                setStaff={setStaff}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StaffManage;
