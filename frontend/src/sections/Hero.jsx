import {
    ArrowDown,
    Download,
    Mail,
} from "lucide-react";
import {
    useEffect,
    useState,
} from "react";

export default function Hero({
    profile,
    socialLinks = [],
}) {
    const title =
        profile?.title ||
        "Software Developer";

    const [typedTitle, setTypedTitle] =
        useState("");

    useEffect(() => {
        let timer = null;
        let cancelled = false;

        const typingSpeed = 100;
        const deletingSpeed = 60;
        const completedPause = 1800;
        const restartPause = 500;

        let index = 0;
        let deleting = false;

        const animate = () => {
            if (cancelled) {
                return;
            }

            // ==============================
            // TYPING
            // ==============================

            if (!deleting) {
                index++;

                setTypedTitle(
                    title.slice(0, index)
                );

                if (index < title.length) {
                    timer = setTimeout(
                        animate,
                        typingSpeed
                    );
                } else {
                    // Finished typing
                    timer = setTimeout(() => {
                        if (cancelled) {
                            return;
                        }

                        deleting = true;
                        animate();
                    }, completedPause);
                }

                return;
            }

            // ==============================
            // DELETING
            // ==============================

            index--;

            setTypedTitle(
                title.slice(0, index)
            );

            if (index > 0) {
                timer = setTimeout(
                    animate,
                    deletingSpeed
                );
            } else {
                // Finished deleting
                deleting = false;

                timer = setTimeout(
                    animate,
                    restartPause
                );
            }
        };

        setTypedTitle("");
        animate();

        return () => {
            cancelled = true;

            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [title]);

    return (
        <section
            id="home"
            className="
                relative
                min-h-[calc(100svh-73px)]
                overflow-hidden
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
                    -left-32
                    top-10
                    h-64
                    w-64
                    rounded-full
                    bg-blue-600/20
                    blur-[100px]
                    sm:-left-40
                    sm:top-20
                    sm:h-80
                    sm:w-80
                    lg:h-96
                    lg:w-96
                    lg:blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    top-0
                    h-64
                    w-64
                    rounded-full
                    bg-purple-600/20
                    blur-[100px]
                    sm:-right-10
                    sm:h-80
                    sm:w-80
                    lg:right-0
                    lg:top-10
                    lg:h-96
                    lg:w-96
                    lg:blur-[120px]
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
                    bg-pink-600/20
                    blur-[100px]
                    sm:h-80
                    sm:w-80
                    lg:left-1/3
                    lg:h-96
                    lg:w-96
                    lg:translate-x-0
                    lg:blur-[120px]
                "
            />


            {/* =====================================================
                GRID BACKGROUND
            ====================================================== */}

            <div className="pointer-events-none absolute inset-0 opacity-[0.12] sm:opacity-[0.16] lg:opacity-20">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                        backgroundSize:
                            "35px 35px",
                    }}
                />
            </div>


            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[calc(100svh-73px)]
                    max-w-7xl
                    flex-col
                    justify-center
                    px-4
                    py-14
                    sm:px-6
                    sm:py-16
                    md:py-20
                    lg:grid
                    lg:grid-cols-2
                    lg:items-center
                    lg:gap-12
                    lg:px-8
                    lg:py-16
                    xl:gap-16
                "
            >

                {/* =================================================
                    LEFT CONTENT
                ================================================== */}

                <div
                    className="
                        order-2
                        text-center
                        lg:order-1
                        lg:text-left
                    "
                >

                    {/* HELLO BADGE */}

                    <div
                        className="
                            mb-5
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-purple-500/30
                            bg-purple-500/10
                            px-3
                            py-1.5
                            sm:mb-6
                            sm:px-4
                            sm:py-2
                        "
                    >
                        <span
                            className="
                                mr-2
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-cyan-400
                                sm:h-2
                                sm:w-2
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                text-purple-300
                                sm:text-sm
                            "
                        >
                            Hello, I'm
                        </span>
                    </div>


                    {/* NAME */}

                    <h1
                        className="
                            mx-auto
                            max-w-[700px]
                            text-3xl
                            font-black
                            leading-[1.05]
                            tracking-tight
                            text-white
                            sm:text-4xl
                            md:text-5xl
                            lg:mx-0
                            lg:text-5xl
                            xl:text-6xl
                        "
                    >
                        {profile?.name ||
                            "Your Name"}
                    </h1>


                    {/* TITLE */}

                    <h2
                        className="
                            mt-4
                            text-xl
                            font-black
                            leading-tight
                            sm:mt-5
                            sm:text-2xl
                            md:text-3xl
                            lg:text-4xl
                            xl:text-4xl
                        "
                    >
                        <span
                            className="
                                bg-gradient-to-r
                                from-cyan-400
                                via-purple-500
                                to-pink-500
                                bg-clip-text
                                text-transparent
                            "
                        >
                            {typedTitle}
                        </span>
                    </h2>


                    {/* SHORT BIO */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-xl
                            text-sm
                            leading-7
                            text-gray-400
                            sm:mt-6
                            sm:text-base
                            sm:leading-8
                            lg:mx-0
                            lg:mt-7
                            lg:text-lg
                            lg:max-w-2xl
                        "
                    >
                        {profile?.short_bio}
                    </p>


                    {/* =================================================
                        BUTTONS
                    ================================================== */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-row
                            justify-center
                            gap-3
                            sm:mt-8
                            sm:gap-4
                            lg:mt-9
                            lg:justify-start
                        "
                    >

                        {/* VIEW WORK */}

                        <a
                            href="#projects"
                            className="
                                group
                                inline-flex
                                min-h-10
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                via-purple-600
                                to-pink-600
                                px-5
                                py-2
                                text-sm
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-purple-600/30
                                transition
                                duration-200
                                hover:scale-[1.02]
                                sm:px-6
                                sm:py-3.5
                                sm:text-base
                            "
                        >
                            View My Work

                            <ArrowDown
                                size={18}
                                className="
                                    -rotate-90
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                "
                            />
                        </a>


                        {/* RESUME */}

                        {profile?.resume && (
                            <a
                                href={
                                    profile.resume
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    inline-flex
                                    min-h-10
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-purple-500/40
                                    bg-white/5
                                    px-5
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    backdrop-blur
                                    transition
                                    duration-200
                                    hover:border-pink-500
                                    hover:bg-white/10
                                    sm:px-6
                                    sm:py-3.5
                                    sm:text-base
                                "
                            >
                                <Download size={18} />

                                Resume
                            </a>
                        )}

                    </div>


                    {/* =================================================
                        SOCIAL LINKS
                    ================================================== */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-3
                            sm:mt-8
                            lg:mt-10
                            lg:justify-start
                        "
                    >

                        {/* EMAIL */}

                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    text-gray-400
                                    transition
                                    hover:border-cyan-400
                                    hover:bg-cyan-400/10
                                    hover:text-cyan-400
                                    sm:h-12
                                    sm:w-12
                                "
                                title="Email"
                            >
                                <Mail
                                    size={18}
                                    className="sm:h-5 sm:w-5"
                                />
                            </a>
                        )}


                        {/* SOCIAL */}

                        {socialLinks.map(
                            (link) => (
                                <a
                                    key={link.id}
                                    href={
                                        link.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={
                                        link.platform
                                    }
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/5
                                        text-gray-400
                                        transition
                                        hover:border-purple-400
                                        hover:bg-purple-400/10
                                        hover:text-purple-400
                                        sm:h-12
                                        sm:w-12
                                    "
                                >
                                    {renderSocialIcon(
                                        link.icon,
                                        link.platform
                                    )}
                                </a>
                            )
                        )}

                    </div>

                </div>


                {/* =================================================
                    PROFILE IMAGE
                ================================================== */}

                <div
                    className="
                        order-1
                        flex
                        justify-center
                        pb-10
                        sm:pb-12
                        lg:order-2
                        lg:justify-end
                        lg:pb-0
                    "
                >

                    <div
                        className="
                            relative
                            scale-90
                            sm:scale-95
                            md:scale-100
                            lg:scale-95
                            xl:scale-100
                            animate-[float_5s_ease-in-out_infinite]
                        "
                    >

                        {/* BLUE GLOW */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -inset-8
                                rounded-full
                                bg-blue-600/20
                                blur-3xl
                                sm:-inset-10
                            "
                        />


                        {/* PURPLE GLOW */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -inset-5
                                rounded-full
                                bg-purple-600/20
                                blur-2xl
                                sm:-inset-6
                            "
                        />


                        {/* RING */}

                        <div
                            className="
                                relative
                                rounded-full
                                bg-gradient-to-r
                                from-cyan-400
                                via-purple-500
                                to-pink-500
                                p-[2px]
                                shadow-2xl
                                shadow-purple-600/40
                                sm:p-[3px]
                            "
                        >

                            <div
                                className="
                                    rounded-full
                                    bg-[#05060d]
                                    p-1.5
                                    sm:p-2
                                    
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
                                        loading="eager"
                                        className="
                                            h-48
                                            w-48
                                            rounded-full
                                            object-cover
                                            sm:h-72
                                            sm:w-72
                                            md:h-80
                                            md:w-80
                                            lg:h-80
                                            lg:w-80
                                            xl:h-[430px]
                                            xl:w-[430px]
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            h-56
                                            w-56
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-gradient-to-br
                                            from-blue-950
                                            via-purple-950
                                            to-pink-950
                                            text-7xl
                                            font-black
                                            text-white
                                            sm:h-72
                                            sm:w-72
                                            sm:text-8xl
                                            md:h-80
                                            md:w-80
                                            lg:h-80
                                            lg:w-80
                                            xl:h-[430px]
                                            xl:w-[430px]
                                        "
                                    >
                                        {profile?.name?.charAt(
                                            0
                                        ) || "P"}
                                    </div>
                                )}

                            </div>
                        </div>


                        {/* =================================================
                            DECORATIONS
                        ================================================== */}

                        {/* Pink */}
                        <div
                            className="
                                absolute
                                -right-2
                                top-10
                                h-3
                                w-3
                                rounded-full
                                bg-pink-500
                                shadow-lg
                                shadow-pink-500/70
                                sm:-right-4
                                sm:top-14
                                sm:h-4
                                sm:w-4
                                lg:-right-5
                                lg:top-16
                                lg:h-5
                                lg:w-5
                            "
                        />

                        {/* Cyan */}
                        <div
                            className="
                                absolute
                                -bottom-1
                                left-5
                                h-3
                                w-3
                                rounded-full
                                bg-cyan-400
                                shadow-lg
                                shadow-cyan-400/70
                                sm:left-7
                                sm:h-3.5
                                sm:w-3.5
                                lg:left-8
                                lg:h-4
                                lg:w-4
                            "
                        />

                        {/* Purple */}
                        <div
                            className="
                                absolute
                                bottom-7
                                right-5
                                h-2
                                w-2
                                rounded-full
                                bg-purple-500
                                shadow-lg
                                shadow-purple-500/70
                                sm:right-7
                                sm:h-2.5
                                sm:w-2.5
                                lg:bottom-12
                                lg:right-8
                                lg:h-3
                                lg:w-3
                            "
                        />

                    </div>

                </div>

            </div>


            {/* =====================================================
                SCROLL INDICATOR
            ====================================================== */}

            <a
                href="#about"
                className="
                    absolute
                    bottom-4
                    left-1/2
                    hidden
                    -translate-x-1/2
                    flex-col
                    items-center
                    gap-1
                    text-gray-500
                    transition
                    hover:text-cyan-400
                    sm:flex
                    sm:bottom-5
                    lg:bottom-8
                "
            >
                <span
                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        sm:text-xs
                        sm:tracking-[0.3em]
                    "
                >
                    Scroll
                </span>

                <ArrowDown
                    size={16}
                    className="
                        animate-bounce
                        sm:h-[18px]
                        sm:w-[18px]
                    "
                />
            </a>

        </section>
    );
}


// =====================================================
// SOCIAL ICONS
// =====================================================

function renderSocialIcon(
    icon,
    platform
) {
    if (!icon && !platform) {
        return null;
    }

    // Uploaded image
    if (
        typeof icon === "string" &&
        (
            icon.startsWith("http://") ||
            icon.startsWith("https://") ||
            icon.startsWith("/storage/")
        )
    ) {
        return (
            <img
                src={icon}
                alt={
                    platform ||
                    "Social icon"
                }
                className="
                    h-5
                    w-5
                    object-contain
                    sm:h-7
                    sm:w-7
                "
            />
        );
    }

    // GitHub
    if (
        normalize(platform) ===
        "github" ||
        normalize(icon) ===
        "github"
    ) {
        return <GithubIcon />;
    }

    // LinkedIn
    if (
        normalize(platform) ===
        "linkedin" ||
        normalize(icon) ===
        "linkedin"
    ) {
        return <LinkedInIcon />;
    }

    // Facebook
    if (
        normalize(platform) ===
        "facebook" ||
        normalize(icon) ===
        "facebook"
    ) {
        return <FacebookIcon />;
    }

    // Instagram
    if (
        normalize(platform) ===
        "instagram" ||
        normalize(icon) ===
        "instagram"
    ) {
        return <InstagramIcon />;
    }

    // X / Twitter
    if (
        normalize(platform) ===
        "twitter" ||
        normalize(platform) === "x" ||
        normalize(icon) === "twitter" ||
        normalize(icon) === "x"
    ) {
        return <XIcon />;
    }

    // YouTube
    if (
        normalize(platform) ===
        "youtube" ||
        normalize(icon) ===
        "youtube"
    ) {
        return <YoutubeIcon />;
    }

    return (
        <span className="text-xs font-bold">
            {icon ||
                platform?.charAt(0) ||
                "•"}
        </span>
    );
}


// =====================================================
// NORMALIZE
// =====================================================

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+/g, "");
}


// =====================================================
// GITHUB
// =====================================================

function GithubIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-current
            "
            aria-hidden="true"
        >
            <path
                d="
                    M12 .5
                    C5.65 .5 .5 5.65 .5 12
                    c0 5.08 3.29 9.38 7.86 10.9
                    .57.1.78-.25.78-.55
                    0-.27-.01-1-.01-1.97
                    -3.2.7-3.88-1.54-3.88-1.54
                    -.52-1.32-1.28-1.67-1.28-1.67
                    -1.04-.71.08-.7.08-.7
                    1.15.08 1.75 1.18 1.75 1.18
                    1.02 1.75 2.68 1.25
                    3.34.96
                    .1-.75.4-1.25.73-1.54
                    -2.55-.29-5.23-1.28-5.23-5.69
                    0-1.26.45-2.29 1.18-3.1
                    -.12-.29-.51-1.47.11-3.06
                    0 0 .97-.31 3.18 1.18
                    a11.1 11.1 0 0 1 2.89-.39
                    c.98 0 1.96.13 2.89.39
                    2.2-1.49 3.17-1.18 3.17-1.18
                    .62 1.59.23 2.77.11 3.06
                    .74.81 1.18 1.84 1.18 3.1
                    0 4.42-2.69 5.4-5.25 5.69
                    .41.35.78 1.04.78 2.1
                    0 1.52-.01 2.75-.01 3.12
                    0 .3.21.66.79.55
                    A11.51 11.51 0 0 0 23.5 12
                    C23.5 5.65 18.35.5 12 .5Z
                "
            />
        </svg>
    );
}


// =====================================================
// LINKEDIN
// =====================================================

function LinkedInIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-current
            "
            aria-hidden="true"
        >
            <path
                d="
                    M20.45 20.45h-3.56v-5.58
                    c0-1.33-.03-3.04-1.85-3.04
                    -1.85 0-2.14 1.45-2.14 2.94v5.68
                    H9.34V8.99h3.42v1.56h.05
                    c.48-.91 1.64-1.87 3.37-1.87
                    3.6 0 4.27 2.37 4.27 5.45v6.32ZM5.32 7.43
                    a2.06 2.06 0 1 1 0-4.12
                    2.06 2.06 0 0 1 0 4.12ZM3.54 20.45
                    H7.1V8.99H3.54v11.46ZM22.23 0
                    H1.77C.79 0 0 .77 0 1.72v20.56
                    C0 23.23.79 24 1.77 24h20.46
                    C23.2 24 24 23.23 24 22.28V1.72
                    C24 .77 23.2 0 22.23 0Z
                "
            />
        </svg>
    );
}


// =====================================================
// FACEBOOK
// =====================================================

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-current
            "
            aria-hidden="true"
        >
            <path
                d="
                    M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07
                    C0 18.1 4.39 23.08 10.13 24v-8.44H7.08v-3.49
                    h3.05V9.41c0-3.04 1.79-4.72 4.55-4.72
                    1.32 0 2.71.24 2.71.24v3h-1.53c-1.5 0-1.97.94-1.97 1.9v2.25h3.35l-.54 3.49h-2.81V24
                    C19.61 23.08 24 18.1 24 12.07Z
                "
            />
        </svg>
    );
}


// =====================================================
// INSTAGRAM
// =====================================================

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-none
                stroke-current
            "
            strokeWidth="2"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
            />

            <circle
                cx="12"
                cy="12"
                r="4"
            />

            <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    );
}


// =====================================================
// X
// =====================================================

function XIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-current
            "
            aria-hidden="true"
        >
            <path
                d="
                    M18.244 2H21.5l-7.11 8.13L22.75 22h-6.5
                    l-5.09-6.79L5.22 22H2l7.6-8.69L1.65 2h6.66
                    l4.6 6.1L18.244 2Zm-1.14 17.93h1.8
                    L7.36 3.97H5.43l11.674 15.96Z
                "
            />
        </svg>
    );
}


// =====================================================
// YOUTUBE
// =====================================================

function YoutubeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="
                h-5
                w-5
                fill-current
            "
            aria-hidden="true"
        >
            <path
                d="
                    M23.5 6.2a3 3 0 0 0-2.12-2.12
                    C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58
                    A3 3 0 0 0 .5 6.2C0 8.08 0 12 0 12
                    s0 3.92.5 5.8a3 3 0 0 0 2.12 2.12
                    C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58
                    a3 3 0 0 0 2.12-2.12C24 15.92 24 12 24 12
                    s0-3.92-.5-5.8ZM9.6 16.5v-9l7.8 4.5-7.8 4.5Z
                "
            />
        </svg>
    );
}