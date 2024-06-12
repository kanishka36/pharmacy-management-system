import { Link } from "react-router-dom";
import { addOrder } from "../../api/order";
import { useSelector, useDispatch } from "react-redux";
import { getOrderId } from "../../redux/user/orderSlice";

const PlaceOrder = () => {
  const cartData = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deliveryAddress = currentUser.rest.address;
  const paymentMethod = "Not selected";
  //submit order info
  const handleSubmit = async () => {
    try {
      const values = { cartData, deliveryAddress, paymentMethod };
      const response = await addOrder(values);
      dispatch(getOrderId(response.orderId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container flex sm:flex-row flex-col mx-auto gap-4">
        <div className="left sm:basis-2/3">
          <div className="my-3 overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Product
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Price
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Quantity
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border border-indigo-600"
                  >
                    <td className=" py-1">{item.products.productName}</td>
                    <td className=" py-1">{item.products.sellingPrice}.00</td>
                    <td className="flex justify-center items-center py-1">
                      <span className="">{item.quantity}</span>
                    </td>

                    <td className=" py-1">
                      {item.products.sellingPrice * item.quantity}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right sm:basis-1/3">
          <div className="bg-indigo-50 rounded-md p-3">
            <p className="font-bold text-indigo-600 text-xl mb-2">
              Order Summery
            </p>
            <div className="border border-indigo-600 p-2">
              <div className="flex">
                <p className="basis-1/3 font-semibold">Subtotal</p>
                <p className="basis-2/3">
                  {total}.00 <span className="font-semibold">LKR</span>
                </p>
              </div>
              <div className="flex">
                <p className="basis-1/3 font-semibold">Shipping</p>
                <div className="">
                  <p className="basis-2/3">
                    Shipping cost 450.00{" "}
                    <span className="font-semibold">LKR</span>
                  </p>
                </div>
              </div>
              <div className="flex">
                <p className="basis-1/3 font-semibold">Total</p>
                <p className="basis-2/3">
                  {total + 450}.00 <span className="font-semibold">LKR</span>
                </p>
              </div>
              <button
                className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-800 hover:scale-[1.02] px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in w-full mt-3"
                onClick={handleSubmit}
              >
                <Link to="/payment-method"> Place Order</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
