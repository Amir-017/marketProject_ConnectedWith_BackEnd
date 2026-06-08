import React, { useEffect, useState } from "react";
import add from "../../imges/shopping_cart-b0846037.png";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";

const AddToCart = ({ }) => {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const getCart = () => {
    axios
      .get("https://e-commerce-nodejs-blush.vercel.app/cart", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((data) => setCart(data?.data.data));
  };

  useEffect(() => {
    getCart();
  }, []);
  console.log(cart);

  const go = () => {
    navigate("/");
  };

  const TABLE_HEAD = [
    "Product",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Actions",
  ];
  const incress = async (product) => {
    const productId = product.product._id;
    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter + 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await axios.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity + 1 },
        {
          headers: {
            authorization: token,
          },
        },
      );
      //////////////////
      setCart(prev =>
        prev?.map(item =>
          item.product._id === productId
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        )
      );
      // getCart();
      // console.log("Cart updated:", res.data);
      ///////////////////////////
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message,
      );
    }
  };

  const decress = async (product) => {
    const productId = product.product._id;
    let counter = JSON.parse(localStorage.getItem("counter"));

    const newCount = counter - 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    console.log(product);

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await axios.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity - 1 },
        {
          headers: {
            authorization: token,
          },
        },
      );
      getCart();
      // console.log("Cart updated:", res.data);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message,
      );
    }
  };
  const clear = async () => {
    let counter = JSON.parse(localStorage.getItem("counter"));

    const newCount = 0;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await axios.delete(
        `https://e-commerce-nodejs-blush.vercel.app/cart`,

        {
          headers: {
            authorization: token,
          },
        },
      );
      getCart();
      // console.log("Cart updated:", res.data);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message,
      );
    }
  };

  const del = async (product) => {
    const productId = product.product._id;
    let counter = JSON.parse(localStorage.getItem("counter"));

    const newCount = counter - product.quantity;
    localStorage.setItem("counter", JSON.stringify(newCount));

    // console.log(product);

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await axios.delete(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,

        {
          headers: {
            authorization: token,
          },
        },
      );
      getCart();
      // console.log("Cart updated:", res.data);
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message,
      );
    }
  };
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full ">
      {cart && cart.length == 0 ? (
        <div className="w-full dark:bg-blue-gray-900 bg-gray-300 min-h-screen flex justify-center items-center ">
          <div className="  flex flex-col justify-center items-center  gap-y-3">
            <img src={add} alt="" className=" w-[200px] h-[200px] " />
            <h2 className="text-gray-600 capitalize dark:text-gray-300">
              your shopping cart is empty
            </h2>
            <button
              onClick={go}
              className=" font-bold capitalize rounded-md bg-green-700 dark:bg-[#282d45] py-3 px-10 text-white shadow-md hover:shadow-lg hover:bg-green-800 dark:hover:bg-[#1f243b] transition-all"
              type="button"
            >
              go shopping now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full min-h-screen justify-center items-center">
          <div className="container mx-auto mt-10    overflow-auto    w-[80%]  flex flex-col justify-center ">
            <h1 className="w-full text-3xl text-center block md:hidden dark:text-white text-black my-5">
              | This Table Is OverFlow |
            </h1>
            <Card className="w-full overflow-x-auto rounded-xl shadow-lg">
              <table className="min-w-full table-auto text-left border-collapse">
                {/* Table Head */}
                <thead>
                  <tr className="bg-blue-gray-50 dark:bg-gray-800">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {cart?.map((item, index) => {
                    const isLast = index === cart.length - 1;
                    return (
                      <tr
                        key={index}
                        className={`text-center dark:bg-[#252B43] bg-white dark:text-white text-black ${!isLast &&
                          "border-b border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        {/* Product Title */}
                        <td className="p-3 text-sm">{item.product?.title}</td>

                        {/* Product Price */}
                        <td className="p-3 text-sm">{item.product?.price}</td>

                        {/* Quantity Controls */}
                        <td className="p-3">
                          <div className="inline-flex rounded-md shadow-sm bg-black">
                            <button
                              onClick={() => decress(item)}
                              className="px-3 py-1 bg-slate-800 dark:bg-gray-700 text-white text-sm font-medium rounded-l-md hover:bg-slate-700 dark:hover:bg-gray-600 transition"
                              type="button"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>

                            <span className="px-4 py-1 bg-slate-700 dark:bg-gray-600 text-white text-sm font-medium">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() => incress(item)}
                              className="px-3 py-1 bg-slate-800 dark:bg-gray-700 text-white text-sm font-medium rounded-r-md hover:bg-slate-700 dark:hover:bg-gray-600 transition"
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="p-3 text-sm">
                          {item?.totalPrice.toFixed(2)}
                        </td>

                        {/* Delete Button */}
                        <td className="p-3 text-sm">
                          <button
                            onClick={() => del(item)}
                            className="px-3 py-1 bg-red-600 dark:bg-red-700 text-white text-sm font-bold rounded-md hover:bg-red-500 dark:hover:bg-red-600 transition"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
          <div className="w-[80%] container mx-auto dark:bg-[#252B43] bg-gray-200 rounded-xl mt-5 flex flex-col mb-5 shadow-lg p-4">
            {/* Header: Clear + Total Items */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-3 mt-2">
              {/* Clear Button */}
              <div className="flex items-center">
                <Button
                  onClick={clear}
                  className="flex items-center gap-2 font-bold text-[0.8rem] bg-red-900 text-white hover:bg-red-800 hover:shadow-lg transition-all px-4 py-2 rounded-md"
                >
                  <FaRegTrashCan className="text-sm" />
                  <span>Clear Data</span>
                </Button>
              </div>

              {/* Total Items */}
              <h1 className="text-xl mt-3 md:mt-0 text-black dark:text-white text-center">
                Total ({cart.totalItems || 0}) Items :{" "}
                <span className="dark:text-blue-gray-400 text-green-900 font-bold underline">
                  {cart && cart.length > 0
                    ? cart
                      .reduce((x, y) => x + y.totalPrice, 0)
                      .toFixed(2)
                    : "0.00"}{" "}
                  EGP
                </span>
              </h1>
            </div>

            {/* Checkout Button */}
            <div className="w-full mt-5 flex justify-center md:justify-end items-center">
              <Button
                color="green"
                className="bg-green-900 dark:bg-[#282d45] hover:shadow-lg text-white font-bold px-6 py-2 rounded-md transition-all"
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
