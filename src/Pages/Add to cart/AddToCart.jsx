import React, { useEffect, useState } from "react";
import add from "../../imges/shopping_cart-b0846037.png";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";
import api from "../../Api/api";
import Swal from "sweetalert2";

const AddToCart = ({ }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /************************************
  *           STATE & DATA
  ************************************/

  const getCart = () => {
    api
      .get("https://e-commerce-nodejs-blush.vercel.app/cart", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((data) => setCart(data?.data.data));
  };

  useEffect(() => {
    setLoading(true);
    getCart();
  }, []);

  // console.log(cart);

  /************************************
   *           NAVIGATION
   ************************************/

  const go = () => {
    navigate("/");
  };

  /************************************
   *           TABLE CONFIG
   ************************************/

  const TABLE_HEAD = [
    "Product",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Actions",
  ];

  /************************************
   *        INCREASE QUANTITY
   ************************************/

  const incress = async (product) => {
    const productId = product.product._id;

    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter + 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Optimistic UI update
      setCart((prev) =>
        prev?.map((item) =>
          item.product._id === productId
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        )
      );

      const res = await api.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity + 1 },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *        DECREASE QUANTITY
   ************************************/

  const decress = async (product) => {
    const productId = product.product._id;

    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter - 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    console.log(product);

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Optimistic UI update
      setCart((prev) =>
        prev?.map((item) =>
          item.product._id === productId
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
      );

      const res = await api.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity - 1 },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *            CLEAR CART
   ************************************/

  const clear = async () => {
    let counter = JSON.parse(localStorage.getItem("counter"));

    const newCount = 0;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const result = Swal.fire({
        title: "Are you sure?",
        text: "This action will clear your entire cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#16a34a",
        confirmButtonText: "Yes, clear it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setCart([]);
          const res = await api.delete(
            `https://e-commerce-nodejs-blush.vercel.app/cart`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          navigate("/");
        }
      });

      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *        DELETE PRODUCT
   ************************************/

  const deleteProduct = async (product) => {
    const productId = product.product._id;
    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter - product.quantity;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      setCart((prev) =>
        prev?.filter((item) => item.product._id !== productId)
      );

      const res = await api.delete(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *       SCROLL RESTORE FIX
   ************************************/

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {cart && cart.length == 0 ? (
        <div className=" w-full h-screen flex justify-center items-center ">
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
      )
        : (
          // {loading ?} 
          <div className="flex flex-col w-full min-h-screen justify-center items-center">
            {loading ? <div className="">
              <div className="container mx-auto  py-10">

                <h1 className="block md:hidden text-center text-lg font-semibold mb-5 text-gray-700 dark:text-gray-300">
                  👈 Swipe Horizontally To View The Full Table
                </h1>

                <Card className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1c2135]">

                  <table className="min-w-full table-auto text-left border-collapse">

                    {/* HEADER */}
                    <thead>
                      <tr className="bg-gradient-to-r from-green-900 to-green-700 dark:from-[#2b3250] dark:to-[#1f2438]">
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={index}
                            className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">

                      {cart?.map((item, index) => {
                        const isLast = index === cart.length - 1;

                        return (
                          <tr
                            key={index}
                            className={`
                text-center transition-all duration-200
                bg-white hover:bg-gray-50
                dark:bg-[#1c2135] dark:hover:bg-[#252b45]
                text-gray-900 dark:text-white
                ${!isLast ? "border-b border-gray-200 dark:border-white/10" : ""}
              `}
                          >

                            {/* PRODUCT TITLE */}
                            <td className="px-6 py-5 text-sm font-medium">
                              {item.product?.title}
                            </td>

                            {/* PRICE */}
                            <td className="px-6 py-5 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                              {item.product?.price} EGP
                            </td>

                            {/* QUANTITY */}
                            <td className="px-6 py-5">

                              <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">

                                <button
                                  onClick={() => decress(item)}
                                  disabled={item.quantity <= 1}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2f4a] dark:hover:bg-[#343b5c] text-white transition disabled:opacity-40"
                                >
                                  -
                                </button>

                                <span className="px-5 py-2 bg-white dark:bg-[#1c2135] text-gray-900 dark:text-white font-semibold">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() => incress(item)}
                                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2f4a] dark:hover:bg-[#343b5c] text-white transition"
                                >
                                  +
                                </button>

                              </div>

                            </td>

                            {/* TOTAL */}
                            <td className="px-6 py-5 text-sm font-bold text-green-700 dark:text-green-400">
                              {(item.product?.price * item.quantity).toFixed(2)} EGP
                            </td>

                            {/* DELETE */}
                            <td className="px-6 py-5">
                              <button
                                onClick={() => deleteProduct(item)}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
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
       <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-6 mt-6 mb-10">

  <div className="w-full rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xl dark:border-white/10 dark:bg-[#1c2135] overflow-hidden">

    {/* TOP SECTION */}
    <div className="flex flex-col justify-between items-center gap-6 text-center md:text-left w-full">

      {/* CLEAR BUTTON */}
      <Button
        onClick={clear}
        className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700 hover:shadow-lg"
      >
        <FaRegTrashCan className="text-sm" />
        Clear Cart
      </Button>

      {/* TOTAL INFO */}
      <div className="text-center w-full md:w-auto">

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Items
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {cart.length || 0} Items
        </h2>

        <p className="mt-2 text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
          {cart && cart.length > 0
            ? cart
                .reduce(
                  (sum, item) =>
                    sum + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)
            : "0.00"}{" "}
          EGP
        </p>

      </div>

    </div>

    {/* DIVIDER */}
    <div className="my-5 h-px w-full bg-gray-200 dark:bg-white/10" />

    {/* CHECKOUT BUTTON */}
    <div className="flex justify-center md:justify-end">

      <Button
        onClick={() => navigate("/order")}
        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-green-700 to-green-900 px-6 sm:px-8 py-3 font-bold text-white transition hover:scale-105 hover:shadow-lg dark:from-[#2b3250] dark:to-[#1f2438]"
      >
        Checkout →
      </Button>

    </div>

  </div>
</div>
            </div> : <div className="loader w-full h-full flex items-center justify-center"></div>}

          </div>

        )}
    </div>
  );
};

export default AddToCart;
