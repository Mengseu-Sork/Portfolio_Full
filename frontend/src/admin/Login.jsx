import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Lock,
    Mail,
    LogIn,
} from "lucide-react";

import { login } from "../api/auth";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await login(
                form.email,
                form.password
            );

            localStorage.setItem(
                "admin_token",
                data.token
            );

            localStorage.setItem(
                "admin_user",
                JSON.stringify(data.user)
            );

            navigate("/admin");

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Login failed. Please check your email and password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-black
                flex items-center
                justify-center
                px-4
            "
        >

            {/* Background */}
            <div className="pointer-events-none absolute inset-0">

                {/* Blue */}
                <div
                    className="
                        absolute
                        -top-40
                        -left-40
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-blue-600/25
                        blur-[130px]
                    "
                />

                {/* Purple */}
                <div
                    className="
                        absolute
                        top-1/4
                        right-[-150px]
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-purple-600/25
                        blur-[130px]
                    "
                />

                {/* Pink */}
                <div
                    className="
                        absolute
                        bottom-[-200px]
                        left-1/3
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-pink-600/20
                        blur-[130px]
                    "
                />

            </div>

            {/* Login */}
            <div className="relative w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">

                    <div
                        className="
                            mx-auto
                            mb-5
                            w-16
                            h-16
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500
                            via-purple-500
                            to-pink-500
                            text-white
                            flex items-center
                            justify-center
                            shadow-2xl
                            shadow-purple-500/30
                        "
                    >
                        <Lock size={28} />
                    </div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            bg-gradient-to-r
                            from-blue-400
                            via-purple-400
                            to-pink-400
                            bg-clip-text
                            text-transparent
                        "
                    >
                        Admin Login
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Sign in to manage your portfolio
                    </p>

                </div>

                {/* Card */}
                <div
                    className="
                        bg-white/5
                        backdrop-blur-2xl
                        rounded-2xl
                        border
                        border-white/10
                        shadow-2xl
                        shadow-purple-900/20
                        p-6
                        sm:p-8
                    "
                >

                    {/* Error */}
                    {error && (
                        <div
                            className="
                                mb-5
                                rounded-xl
                                bg-red-500/10
                                border
                                border-red-500/20
                                px-4
                                py-3
                                text-sm
                                text-red-300
                            "
                        >
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-300
                                    mb-2
                                "
                            >
                                Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-purple-400
                                    "
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    required
                                    autoComplete="email"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-black/30
                                        pl-10
                                        pr-4
                                        py-3
                                        text-white
                                        placeholder:text-slate-600
                                        outline-none
                                        transition
                                        focus:border-purple-500
                                        focus:ring-2
                                        focus:ring-purple-500/20
                                    "
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-300
                                    mb-2
                                "
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-purple-400
                                    "
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-black/30
                                        pl-10
                                        pr-4
                                        py-3
                                        text-white
                                        placeholder:text-slate-600
                                        outline-none
                                        transition
                                        focus:border-purple-500
                                        focus:ring-2
                                        focus:ring-purple-500/20
                                    "
                                />

                            </div>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                via-purple-600
                                to-pink-600
                                px-4
                                py-3
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-purple-500/20
                                transition-all
                                hover:scale-[1.01]
                                hover:shadow-purple-500/30
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            <LogIn size={18} />

                            {loading
                                ? "Signing in..."
                                : "Sign In"
                            }

                        </button>

                    </form>

                </div>

                {/* Footer */}
                <p
                    className="
                        text-center
                        text-xs
                        text-slate-600
                        mt-6
                    "
                >
                    Portfolio Management System
                </p>

            </div>

        </div>
    );
}