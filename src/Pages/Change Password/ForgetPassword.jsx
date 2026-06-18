import { useState } from "react";
import axios from "axios";

export const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/users/forgotPassword", {
                email,
            }
            );

            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message);
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="forget-password-container w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2>Forgot Password</h2>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Send Reset Link</button>
        </form>
    );
}