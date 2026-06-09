import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../Api/api";

export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        images: [""],
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        rating: "",
        discountPercentage: "",
        inStock: true,
    });

    const [loading, setLoading] = useState(true);

    // ==========================
    // Get Product
    // ==========================

    const getProduct = async () => {
        try {
            const res = await api.get(
                `https://e-commerce-nodejs-blush.vercel.app/products/${id}`
            );

            setProduct(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);
    // console.log(product);
    // ==========================
    // Handle Change
    // ==========================

    const handleChange = (e) => {
     const { name, value } = e.target;
      if (name === "images") {
    setProduct({
      ...product,
      images: [value],
    });
  } else {
    setProduct({
      ...product,
      [name]: value,
    });
  }
    };

    // ==========================
    // Update Product
    // ==========================

    const updateProduct = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("accessToken"));

        try {
            await api.patch(
                `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
                product,
                 {
                headers: {

                    authorization: token,
                },
            }
            );

            const result = await Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product updated successfully",
                confirmButtonColor: "#16a34a",
            });

            if (result.isConfirmed) {
                navigate("/AdminDashboard");
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update product",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="loader text-2xl font-bold"></h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Update Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Edit product information and save your changes.
                    </p>
                </div>

                {/* Form */}

                <form onSubmit={updateProduct} className="space-y-6">

                    <div>
                        <label className="block mb-2 font-semibold">
                            img URL
                        </label>

                        <input
                            type="text"
                            name="images"
                            defaultValue={product.images?.[0] || ""}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2 font-semibold">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2 font-semibold">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={product.brand}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Rating
                            </label>

                            <input
                                type="text"
                                name="rating"
                                value={product.rating}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Discount Percentage
                            </label>

                            <input
                                type="text"
                                name="discountPercentage"
                                value={product.discountPercentage}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.01]"
                        >
                            Update Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}