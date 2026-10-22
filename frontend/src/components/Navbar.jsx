import { useEffect, useState } from "react";

import {
    Menu,
    X,
} from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "#home",
    },
    {
        name: "About",
        href: "#about",
    },
    {
        name: "Skills",
        href: "#skills",
    },
    {
        name: "Services",
        href: "#services",
    },
    {
        name: "Projects",
        href: "#projects",
    },
    {
        name: "Experience",
        href: "#experience",
    },
    {
        name: "Education",
        href: "#education",
    },
    {
        name: "Contact",
        href: "#contact",
    },
];

export default function Navbar({ profile }) {
    const [open, setOpen] = useState(false);

    const [activeSection, setActiveSection] =
        useState("home");

    // ==========================================
    // ACTIVE SECTION WHILE SCROLLING
    // ==========================================

    useEffect(() => {
        const sections = menuItems
            .map((item) =>
                document.getElementById(
                    item.href.replace("#", "")
                )
            )
            .filter(Boolean);

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections =
                    entries
                        .filter(
                            (entry) =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );

                if (
                    visibleSections.length > 0
                ) {
                    setActiveSection(
                        visibleSections[0].target.id
                    );
                }
            },
            {
                root: null,

                /*
                 * Navbar height compensation.
                 */
                rootMargin:
                    "-25% 0px -55% 0px",

                threshold: [
                    0,
                    0.1,
                    0.25,
                    0.5,
                    0.75,
                    1,
                ],
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(
                (section) => {
                    observer.unobserve(
                        section
                    );
                }
            );

            observer.disconnect();
        };
    }, []);

    // ==========================================
    // CLICK MENU
    // ==========================================

    const handleNavClick = (
        href
    ) => {
        const id =
            href.replace("#", "");

        setActiveSection(id);

        setOpen(false);
    };

    return (
        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-white/10
                bg-[#03040b]/80
                backdrop-blur-xl
            "
        >
            <nav
                className="
                    mx-auto
                    flex
                    max-w-full
                    items-center
                    justify-between
                    px-4
                    py-4
                    sm:px-6
                    lg:px-10
                "
            >

                {/* =================================
                    LOGO
                ================================== */}

                <a
                    href="#home"
                    onClick={() =>
                        handleNavClick(
                            "#home"
                        )
                    }
                    className="
                        group
                        flex
                        items-center
                        gap-3
                    "
                >
                    {profile?.profile_image ? (
                        <img
                            src={
                                profile.profile_image
                            }
                            alt={
                                profile.name ||
                                "Profile"
                            }
                            className="
                                h-10
                                w-10
                                rounded-full
                                object-cover
                                ring-2
                                ring-purple-500/50
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-cyan-400
                                via-purple-500
                                to-pink-500
                                font-bold
                                text-white
                                shadow-lg
                                shadow-purple-500/30
                            "
                        >
                            {profile?.name?.charAt(
                                0
                            ) || "P"}
                        </div>
                    )}

                    <div className="hidden sm:block">
                        <p className="font-bold text-white">
                            {profile?.name ||
                                "Portfolio"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {profile?.title ||
                                "Software Developer"}
                        </p>
                    </div>
                </a>


                {/* =================================
                    DESKTOP NAVIGATION
                ================================== */}

                <div
                    className="
                        hidden
                        items-center
                        gap-5
                        xl:flex
                    "
                >
                    {menuItems.map(
                        (item) => {
                            const sectionId =
                                item.href.replace(
                                    "#",
                                    ""
                                );

                            const isActive =
                                activeSection ===
                                sectionId;

                            return (
                                <a
                                    key={
                                        item.name
                                    }
                                    href={
                                        item.href
                                    }
                                    onClick={() =>
                                        handleNavClick(
                                            item.href
                                        )
                                    }
                                    className={`
                                        group
                                        relative
                                        py-1
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200
                                        ${isActive
                                            ? `
                                                    text-white
                                                `
                                            : `
                                                    text-gray-400
                                                    hover:text-white
                                                `
                                        }
                                    `}
                                >
                                    {item.name}

                                    {/* Active underline */}
                                    <span
                                        className={`
                                            absolute
                                            -bottom-2
                                            left-0
                                            h-[2px]
                                            rounded-full
                                            bg-gradient-to-r
                                            from-cyan-400
                                            via-purple-500
                                            to-pink-500
                                            transition-all
                                            duration-300
                                            ${isActive
                                                ? "w-full opacity-100"
                                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                                            }
                                        `}
                                    />

                                    {/* Active glow */}
                                    {isActive && (
                                        <span
                                            className="
                                                absolute
                                                -inset-x-2
                                                -inset-y-1
                                                -z-10
                                                rounded-lg
                                                bg-purple-500/5
                                                blur-md
                                            "
                                        />
                                    )}
                                </a>
                            );
                        }
                    )}
                </div>


                {/* =================================
                    MOBILE BUTTON
                ================================== */}

                <button
                    type="button"
                    onClick={() =>
                        setOpen(
                            (value) =>
                                !value
                        )
                    }
                    className="
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        p-2
                        text-gray-300
                        transition
                        hover:border-purple-500/50
                        hover:bg-purple-500/10
                        hover:text-white
                        xl:hidden
                    "
                    aria-label={
                        open
                            ? "Close menu"
                            : "Open menu"
                    }
                    aria-expanded={open}
                >
                    {open ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            </nav>


            {/* =====================================
                MOBILE MENU
            ====================================== */}

            {open && (
                <div
                    className="
                        border-t
                        border-white/10
                        bg-[#05060d]/95
                        backdrop-blur-xl
                        xl:hidden
                    "
                >
                    <div
                        className="
                            mx-auto
                            flex
                            max-w-7xl
                            flex-col
                            gap-1
                            px-4
                            py-4
                            sm:px-6
                        "
                    >
                        {menuItems.map(
                            (item) => {
                                const sectionId =
                                    item.href.replace(
                                        "#",
                                        ""
                                    );

                                const isActive =
                                    activeSection ===
                                    sectionId;

                                return (
                                    <a
                                        key={
                                            item.name
                                        }
                                        href={
                                            item.href
                                        }
                                        onClick={() =>
                                            handleNavClick(
                                                item.href
                                            )
                                        }
                                        className={`
                                            relative
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-sm
                                            font-medium
                                            transition
                                            ${isActive
                                                ? `
                                                        bg-gradient-to-r
                                                        from-cyan-500/10
                                                        via-purple-500/10
                                                        to-pink-500/10
                                                        text-white
                                                        ring-1
                                                        ring-purple-500/20
                                                    `
                                                : `
                                                        text-gray-400
                                                        hover:bg-white/5
                                                        hover:text-white
                                                    `
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-between">
                                            {item.name}

                                            {isActive && (
                                                <span
                                                    className="
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        bg-gradient-to-r
                                                        from-cyan-400
                                                        via-purple-500
                                                        to-pink-500
                                                        shadow-lg
                                                        shadow-purple-500/50
                                                    "
                                                />
                                            )}
                                        </span>
                                    </a>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}