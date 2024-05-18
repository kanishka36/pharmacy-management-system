import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { displaySinglePrescription } from "../../api/prescription";
import { useParams } from "react-router-dom";
import ProductSearch from "../ProductSearch";

const PrescriptionView = () => {
  const [data, setData] = useState([]);
  const id = useParams();

  const fetchPrescription = async () => {
    try {
      const response = await displaySinglePrescription(id.id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrescription();
  }, []);

  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <div className="flex xl:flex-row flex-col">
            <div className="details p-3 basis-2/3 bg-indigo-100 h-screen">
              <div className="flex">
                <p className="font-bold mr-3">Name:</p>
                <p>{data.name}</p>
              </div>
              <div className="flex">
                <p className="font-bold mr-3">Age:</p>
                <p>{data.age}</p>
              </div>
              <div className="flex">
                <p className="font-bold mr-3">Email:</p>
                <p>{data.email}</p>
              </div>
              <div className="flex">
                <p className="font-bold mr-3">Contact No:</p>
                <p>{data.contactNo}</p>
              </div>
              <div className="flex">
                <p className="font-bold mr-3">Address:</p>
                <p>{data.deliveryAddress}</p>
              </div>
              <div className="flex">
                <p className="font-bold mr-3">Special Note:</p>
                <p>{data.note}</p>
              </div>
              <div className="mt-3">
                <img src={data.image} alt="prescription" className="w-full" />
              </div>
            </div>
            <div className="quotation m-3 basis-1/3">
              <ProductSearch />
              <p>add here quation cal</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionView;
