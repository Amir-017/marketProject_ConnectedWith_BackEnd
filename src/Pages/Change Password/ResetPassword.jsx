import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const res = await axios.post("http://localhost:3000/users/resetPassword", {
                token,
                newPassword,
            }
            );

            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="reset-password-container w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}