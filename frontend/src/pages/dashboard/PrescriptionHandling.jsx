import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { displayPrescription } from "../../api/prescription";
import { useNavigate } from "react-router-dom";

const PrescriptionHandling = () => {
  const [prescription, setPrescription] = useState([]);
  const navigate = useNavigate();

  const fetchPrescription = async () => {
    try {
      const response = await displayPrescription();
      setPrescription(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    fetchPrescription()
  },[])

  const handleSubmit = (id) => {
    navigate(`/dashboard/prescription/${id}`)
  }


  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Prescription Handling
          </h1>
          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Customer Name
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Date
                  </th>
                  <th className="border-2 border-indigo-600 text-indigo-600 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescription.map((pres, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {pres.name}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {pres.currentDate}
                    </td>
                    <td className="border border-indigo-600">
                      <button
                        type="button"
                        className="text-indigo-600 mr-1"
                        onClick={()=>handleSubmit(pres._id)}
                      >
                        View
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

export default PrescriptionHandling;
