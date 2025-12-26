"use client"
import axiosInstance from "@/api/axios";
import { useMainContext } from "@/context/MainContext";
import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isLoading: IS_LOADING } = useMainContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosInstance.post("/login", { email, password });
            if (typeof (window) != undefined && response.user && !response.failed) {
                window.location.href = "/"
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-background p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        disabled={IS_LOADING || isLoading}
                        type="submit"
                        className="w-full py-2 bg-chart-1 text-white text-backgroubg-background rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {(isLoading || IS_LOADING) ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
