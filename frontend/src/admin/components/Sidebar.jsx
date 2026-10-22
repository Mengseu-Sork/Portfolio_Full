import {
    LayoutDashboard,
    User,
    FolderKanban,
    Wrench,
    Briefcase,
    GraduationCap,
    Share2,
    Mail,
    LogOut,
    X,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { logout } from "../../api/auth";

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Profile",
        path: "/admin/profile",
        icon: User,
    },
    {
        name: "Projects",
        path: "/admin/projects",
        icon: FolderKanban,
    },
    {
        name: "Skills",
        path: "/admin/skills",
        icon: Wrench,
    },
    {
        name: "Services",
        path: "/admin/services",
        icon: Briefcase,
    },
    {
        name: "Experience",
        path: "/admin/experiences",
        icon: Briefcase,
    },
    {
        name: "Education",
        path: "/admin/educations",
        icon: GraduationCap,
    },
    {
        name: "Social Links",
        path: "/admin/social-links",
        icon: Share2,
    },
    {
        name: "Messages",
        path: "/admin/contact-messages",
        icon: Mail,
    },
];

export default function Sidebar({
    open,
    onClose,
}) {

    const navigate =
        useNavigate();

    const handleLogout =
        async () => {

            try {
                await logout();
            } catch (error) {
                console.error(error);
            }

            localStorage.removeItem(
                "admin_token"
            );

            localStorage.removeItem(
                "admin_user"
            );

            navigate(
                "/admin/login",
                {
                    replace: true,
                }
            );
        };

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="
                        fixed
                        inset-0
                        z-30
                        bg-black/70
                        backdrop-blur-sm
                        lg:hidden
                    "
                    onClick={
                        onClose
                    }
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed
                    z-40
                    inset-y-0
                    left-0
                    w-56
                    text-white
                    bg-gradient-to-b
                    from-black
                    via-blue-950
                    to-purple-950
                    border-r
                    border-white/10
                    shadow-2xl
                    transform
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Header */}
                <div
                    className="
                        h-16
                        flex
                        items-center
                        justify-between
                        px-5
                        border-b
                        border-white/10
                    "
                >

                    <div>

                        <h1
                            className="
                                font-bold
                                text-lg
                                bg-gradient-to-r
                                from-blue-400
                                via-purple-400
                                to-pink-400
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Portfolio Admin
                        </h1>

                        <p className="text-xs text-slate-500">
                            Management Panel
                        </p>

                    </div>

                    <button
                        onClick={
                            onClose
                        }
                        className="
                            lg:hidden
                            p-1.5
                            rounded-lg
                            text-slate-400
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Menu */}
                <nav
                    className="
                        p-3
                        space-y-1
                        overflow-y-auto
                        h-[calc(100vh-8rem)]
                    "
                >

                    {menu.map(
                        (item) => {

                            const Icon =
                                item.icon;

                            return (
                                <NavLink
                                    key={
                                        item.path
                                    }
                                    to={
                                        item.path
                                    }
                                    end={
                                        item.path ===
                                        "/admin"
                                    }
                                    onClick={
                                        onClose
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        font-medium
                                        transition
                                        ${isActive
                                            ? `
                                                    bg-gradient-to-r
                                                    from-blue-600
                                                    via-purple-600
                                                    to-pink-600
                                                    text-white
                                                    shadow-lg
                                                    shadow-purple-500/20
                                                `
                                            : `
                                                    text-slate-300
                                                    hover:bg-white/10
                                                    hover:text-white
                                                `
                                        }
                                        `
                                    }
                                >

                                    <Icon
                                        size={18}
                                    />

                                    <span>
                                        {
                                            item.name
                                        }
                                    </span>

                                </NavLink>
                            );
                        }
                    )}

                </nav>

                {/* Logout */}
                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-3
                        border-t
                        border-white/10
                        bg-black/30
                        backdrop-blur-xl
                    "
                >

                    <button
                        onClick={
                            handleLogout
                        }
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3 py-2.5
                            rounded-xl
                            text-sm
                            text-slate-300
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >

                        <LogOut
                            size={18}
                        />

                        Logout

                    </button>

                </div>

            </aside>
        </>
    );
}