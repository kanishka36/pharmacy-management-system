import React from "react";

const Orders = () => {
  return (
    <>
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
          Orders
        </h2>
        <p>
          Order [#13514] was placed on [April 17, 2024] and currently [Pending
          payment]
        </p>
        <div className="">
          <p>Order details</p>
          <div className="my-3 overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Order
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Date
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Status
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {staff.map((member, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {member._id}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {member.firstName + " " + member.lastName}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
