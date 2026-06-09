import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import api from "../../Api/api";
const DetailsItem = ({ aboutAdding, setAboutAdding }) => {
  const [detailsProduct, setDetailsProduct] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(useParams());

  const getDetails = () => {
    api({
      method: "get",
      url: `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
    }).then((data) => setDetailsProduct(data.data.data));
  };

  const getInfoUser = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const res = await api.get(`https://e-commerce-nodejs-blush.vercel.app/users/profile`, {
        headers: {
          authorization: token
        }
      });
      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };



  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    getDetails();
    getInfoUser();


  }, []);
  //  console.log(detailsProduct);
  // console.log(userInfo);

  const addition = async (d) => {
    // console.log(counter);

    const token = JSON.parse(localStorage.getItem("accessToken"));
    let counter = JSON.parse(localStorage.getItem("counter"));



    const newCount = counter + 1;
    localStorage.setItem('counter', JSON.stringify(newCount));


    try {
      if (userInfo && userInfo.role === "admin") {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Sorry you are admin you can\'t  add product to cart',
          confirmButtonColor: "#dc2626"
        });
        return;
      }

       await Swal.fire({
        icon: "success",
        title: "Success",
        text: 'Product added to cart successfully',
        confirmButtonColor: "#16a34a"

      });
      const res = await api.post(
        "https://e-commerce-nodejs-blush.vercel.app/cart/addTocart",
        {
          products: [{ product: detailsProduct._id, quantity: 1 }]
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      // console.log(res.data);

    
    
    } catch (error) {
        await Swal.fire({
    icon: "error",
    title: "Error",
    text: 'Please login to add products to cart',
    confirmButtonColor: "#dc2626"
  });
  navigate("/login");
  return;

    }


  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col justify-center  dark:bg-blue-gray-900 bg-[#EAEAEA] ">
      <div className="w-full  bg-white dark:bg-blue-gray-800 rounded-xl container mx-auto   ">
        <div className="w-full flex flex-col md:flex-row ">
          <div className="w-full md:w-[60%] flex flex-col justify-center items-center  ">
            {detailsProduct.images?.map((item, i) => (
              <div className="w-full " key={i}>
                <div className="  flex justify-center items-center">
                  {i == 0 && (
                    <img src={item} alt="" className="w-[40%] md:w-[45%] " />
                  )}
                </div>
              </div>
            ))}
            {/*  */}
          </div>
          <div className="w-full md:w-[45%] me-5">
            <h1 className="text-black dark:text-white font-bold  text-center md:text-start mt-5">
              {detailsProduct ? detailsProduct.title : ""}
            </h1>
            <hr className="border-t-2 border-gray-300 mt-2  dark:border-black" />
            <h2 className="text-gray-600 mt-5 dark:text-gray-200 ms-2 md:ms-0 ">
              {detailsProduct ? detailsProduct.description : ""}
            </h2>
            <div className=" w-full  flex flex-col md:flex-row gap-y-3  gap-x-3 mt-10 justify-center items-center md:items-start md:justify-start">
              <h1 className="font-bold dark:text-white   ">
                Rating :{" "}
                <span className="dark:text-blue-gray-400 text-green-500 underline">
                  {detailsProduct ? detailsProduct.rating : ""}
                </span>
              </h1>{" "}
              <span className="font-bold dark:text-gray-400">||</span>{" "}
              <h1 className="font-bold dark:text-white text-center">
                Brand :{" "}
                <span className="text-green-500 underline dark:text-blue-gray-400">
                  {detailsProduct.brand
                    ? detailsProduct.brand
                    : detailsProduct.tags
                      ? detailsProduct.tags.map((im) => im)
                      : "UNKNOWN"}
                </span>
              </h1>{" "}
              <span className="font-bold dark:text-gray-400">||</span>{" "}
              <h1 className="font-bold dark:text-white">
                Category :{" "}
                <span className="text-green-500 underline dark:text-blue-gray-400">
                  {detailsProduct ? detailsProduct.category : ""}
                </span>
              </h1>{" "}
            </div>
            <div className="w-full mt-16 dark:bg-[#252B43] bg-gray-200  rounded-xl container ps-2 dark:text-gray-400 text-gray-600 ">
              <div className="flex gap-x-2 pt-5 justify-center md:justify-start">
                <h1 className="font-bold line-through me-1 ">
                  <span className=" me-1">
                    {detailsProduct ? detailsProduct.price : ""}
                  </span>
                  EGP
                </h1>
                <span className="text-grya-600">inclusive in takes</span>
              </div>
              <div className="flex gap-x-4 mt-5 h-16 justify-center md:justify-start">
                <h1 className=" font-bold dark:text-green-500 text-green-900 text-[1.5rem]">
                  {detailsProduct &&
                    (
                      detailsProduct.price -
                      detailsProduct.price *
                      (detailsProduct.discountPercentage / 100)
                    ).toFixed(2)}{" "}
                  EGP
                </h1>

                <div className="text-white    italic text-xl">
                  <h1 className="dark:bg-[#2c324a] bg-green-800 px-3 py-1 rounded">
                    {detailsProduct ? detailsProduct.discountPercentage : ""} %
                    off
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 mt-10 mb-2 justify-center md:justify-start">
              <div className="relative flex ">
                <Button
                  onClick={() => addition(detailsProduct)}
                  color="green"
                  size="lg"
                  className="dark:bg-[#232a45]   hover:dark:dark:bg-[#181f39]  bg-green-800 hover:bg-green-900 hover:shadow capitalize font-bold "
                >
                  add to cart
                </Button>
                <CiShoppingCart className="text-2xl text-white font-bold absolute right-0  top-3" />
              </div>

              <button
                className="font-bold dark:bg-[#232a45]   hover:dark:dark:bg-[#181f39]  capitalize rounded-md bg-green-800 hover:bg-green-900 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-lg hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                buy now
              </button>
            </div>
          </div>
        </div>
        {/* <div className="w-full dark:bg-blue-gray-900 bg-[#EAEAEA] "></div> */}
      </div>
    </div>
  );
};

export default DetailsItem;
