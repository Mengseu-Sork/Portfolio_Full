import {
    ArrowUp,
    ArrowUpRight,
    Heart,
} from "lucide-react";

export default function Footer({
    profile,
    socialLinks = [],
}) {
    const year =
        new Date().getFullYear();

    const activeSocialLinks =
        socialLinks.filter(
            (link) =>
                link.is_active !== false
        );

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

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

    return (
        <footer
            className="
                relative
                overflow-hidden
                border-t
                border-white/10
                bg-[#02030a]
            "
        >
            {/* =====================================================
                BACKGROUND GLOW
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-72
                    w-72
                    rounded-full
                    bg-blue-600/15
                    blur-[120px]
                    sm:h-96
                    sm:w-96
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-0
                    h-72
                    w-72
                    rounded-full
                    bg-purple-600/15
                    blur-[120px]
                    sm:h-96
                    sm:w-96
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-1/2
                    h-64
                    w-64
                    -translate-x-1/2
                    rounded-full
                    bg-pink-600/10
                    blur-[120px]
                    sm:h-80
                    sm:w-80
                "
            />

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    py-12
                    sm:px-6
                    sm:py-16
                    lg:px-8
                    lg:py-20
                "
            >
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-10
                        lg:grid-cols-12
                        lg:gap-12
                    "
                >
                    {/* =================================================
                        PROFILE
                    ================================================== */}

                    <div
                        className="
                            lg:col-span-5
                        "
                    >
                        <div className="max-w-lg">

                            {/* Name */}

                            <a
                                href="#home"
                                className="
                                    inline-block
                                    bg-gradient-to-r
                                    from-cyan-400
                                    via-purple-400
                                    to-pink-400
                                    bg-clip-text
                                    text-2xl
                                    font-black
                                    text-transparent
                                    sm:text-3xl
                                    md:text-4xl
                                "
                            >
                                {profile?.name}
                            </a>


                            {/* Title */}

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    font-medium
                                    text-purple-400
                                    sm:text-base
                                "
                            >
                                {profile?.title}
                            </p>


                            {/* Short Bio */}

                            <p
                                className="
                                    mt-5
                                    text-xs
                                    leading-6
                                    text-slate-400
                                    sm:text-base
                                    sm:leading-8
                                "
                            >
                                {profile?.short_bio ||
                                    "Building modern web applications with clean code, creative design, and powerful technology."}
                            </p>

                        </div>
                    </div>


                    {/* =================================================
                        QUICK LINKS
                    ================================================== */}

                    <div
                        className="
                            lg:col-span-3
                        "
                    >
                        <h3
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-white
                            "
                        >
                            Quick Links
                        </h3>

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-2
                                gap-x-6
                                gap-y-3
                            "
                        >
                            {menuItems.map(
                                (item) => (
                                    <a
                                        key={
                                            item.name
                                        }
                                        href={
                                            item.href
                                        }
                                        className="
                                            group
                                            flex
                                            items-center
                                            text-sm
                                            text-slate-500
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        <span
                                            className="
                                                mr-2
                                                h-1
                                                w-0
                                                rounded-full
                                                bg-gradient-to-r
                                                from-cyan-400
                                                to-purple-500
                                                transition-all
                                                duration-300
                                                group-hover:w-2
                                            "
                                        />

                                        {
                                            item.name
                                        }
                                    </a>
                                )
                            )}
                        </div>
                    </div>


                    {/* =================================================
                        SOCIAL
                    ================================================== */}

                    <div className="lg:col-span-4">
                        <div className="mb-2">
                            <h3
                                className="
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white
                                "
                            >
                                Connect With Me
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Find me online and stay connected.
                            </p>
                        </div>

                        {activeSocialLinks.length > 0 ? (
                            <div
                                className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    "
                            >
                                {activeSocialLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit ${link.name || "social profile"}`}
                                        title={link.name || "Social Profile"}
                                        className="
                                            group
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/[0.03]
                                            text-slate-400
                                            backdrop-blur-xl
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-purple-400/40
                                            hover:bg-purple-500/10
                                            hover:text-purple-300
                                            hover:shadow-lg
                                            hover:shadow-purple-500/10
                                        "
                                    >
                                        {renderSocialIcon(link.icon)}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-5 text-sm text-slate-600">
                                No social links available.
                            </p>
                        )}
                    </div>
                </div>


                {/* =====================================================
                    DIVIDER
                ====================================================== */}

                <div
                    className="
                        my-8
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        sm:my-10
                    "
                />


                {/* =====================================================
                    BOTTOM
                ====================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-center
                    "
                >

                    {/* Copyright */}

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-1.5
                            text-xs
                            leading-6
                            text-slate-600
                            sm:text-sm
                        "
                    >
                        <span>
                            © {year}{" "}
                            {profile?.name ||
                                "Portfolio"}
                            .
                        </span>

                        <span>
                            All rights reserved.
                        </span>

                        <span className="inline-flex items-center gap-1">
                            Made with
                            <Heart
                                size={13}
                                className="
                                    fill-pink-500
                                    text-pink-500
                                "
                            />
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}


// =====================================================
// SOCIAL ICON
// =====================================================

function renderSocialIcon(icon) {
    if (!icon) {
        return (
            <span className="text-xs">
                ?
            </span>
        );
    }

    /*
     * Uploaded image
     */
    if (
        icon.startsWith(
            "http://"
        ) ||
        icon.startsWith(
            "https://"
        ) ||
        icon.startsWith(
            "/storage/"
        )
    ) {
        return (
            <img
                src={icon}
                alt="Social icon"
                loading="lazy"
                className="
                    h-5 sm:h-7
                    w-5 sm:w-7
                    object-contain
                "
            />
        );
    }

    /*
     * Stored Laravel path
     */
    if (
        icon.startsWith(
            "icons/"
        ) ||
        icon.startsWith(
            "storage/"
        )
    ) {
        const storageUrl =
            import.meta.env
                .VITE_STORAGE_URL ||
            "http://127.0.0.1:8000/storage";

        const path =
            icon.replace(
                /^storage\//,
                ""
            );

        return (
            <img
                src={`${storageUrl}/${path}`}
                alt="Social icon"
                loading="lazy"
                className="
                    h-5
                    w-5
                    object-contain
                "
            />
        );
    }

    /*
     * Fallback text/icon
     */
    return (
        <span
            className="
                max-w-[24px]
                truncate
                text-[10px]
                font-bold
                uppercase
                text-cyan-400
            "
        >
            {icon.slice(0, 3)}
        </span>
    );
}