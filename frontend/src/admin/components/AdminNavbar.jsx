import {
    Menu,
    User,
} from "lucide-react";

export default function AdminNavbar({
    onMenuClick,
}) {

    let user = {};

    try {
        user = JSON.parse(
            localStorage.getItem(
                "admin_user"
            ) || "{}"
        );
    } catch (error) {
        console.error(error);
    }

    return (
        <header
            className="
                sticky
                top-0
                z-20
                h-16
                bg-black/50
                backdrop-blur-xl
                border-b
                border-white/10
                flex
                items-center
                justify-between
                px-4 sm:px-6
            "
        >

            <button
                onClick={
                    onMenuClick
                }
                className="
                    lg:hidden
                    p-2
                    rounded-lg
                    text-slate-300
                    hover:bg-white/10
                    hover:text-white
                "
            >
                <Menu size={22} />
            </button>

            <div className="hidden lg:block">

                <h2 className="font-semibold text-white">
                    Admin Panel
                </h2>

                <p className="text-xs text-slate-500">
                    Portfolio Management
                </p>

            </div>

            <div className="flex items-center gap-3 ml-auto">

                <div className="hidden sm:block text-right">

                    <p className="text-sm font-semibold text-white">
                        {
                            user.name ||
                            "Admin"
                        }
                    </p>

                    <p className="text-xs text-slate-500">
                        {
                            user.email ||
                            ""
                        }
                    </p>

                </div>

                <div
                    className="
                        w-10 h-10
                        rounded-full
                        bg-gradient-to-br
                        from-blue-500
                        via-purple-500
                        to-pink-500
                        flex
                        items-center
                        justify-center
                        text-white
                        shadow-lg
                    "
                >
                    <User size={19} />
                </div>

            </div>

        </header>
    );
}