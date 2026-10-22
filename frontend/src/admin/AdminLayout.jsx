import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-black
            "
        >

            {/* Background */}
            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    overflow-hidden
                "
            >

                {/* Blue */}
                <div
                    className="
                        absolute
                        -top-40
                        -left-40
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-blue-600/20
                        blur-[120px]
                    "
                />

                {/* Purple */}
                <div
                    className="
                        absolute
                        top-1/3
                        right-[-150px]
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-purple-600/20
                        blur-[120px]
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
                        bg-pink-600/15
                        blur-[130px]
                    "
                />

            </div>

            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            {/* Main */}
            <div
                className="
                    relative
                    min-h-screen
                    lg:pl-56
                "
            >

                <AdminNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main
                    className="
                        relative
                        p-4
                        sm:p-6
                        lg:p-8
                    "
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
}