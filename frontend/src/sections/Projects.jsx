import { useEffect, useState } from "react";

import {
    ExternalLink,
    Code2,
    CalendarDays,
    Users,
    UserRound,
    X,
} from "lucide-react";

export default function Projects({
    projects = [],
}) {
    /*
    |--------------------------------------------------------------------------
    | Featured projects first
    |--------------------------------------------------------------------------
    */

    const featuredProjects =
        projects.filter(
            (project) =>
                project.is_featured
        );

    const displayedProjects =
        featuredProjects.length > 0
            ? featuredProjects
            : projects;

    /*
    |--------------------------------------------------------------------------
    | Selected project
    |--------------------------------------------------------------------------
    */

    const [selectedProject, setSelectedProject] =
        useState(null);

    /*
    |--------------------------------------------------------------------------
    | Prevent body scrolling while modal is open
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow =
                "hidden";
        } else {
            document.body.style.overflow =
                "";
        }

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [selectedProject]);

    /*
    |--------------------------------------------------------------------------
    | Close modal with ESC
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                event.key === "Escape"
            ) {
                setSelectedProject(
                    null
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);

    return (
        <section
            id="projects"
            className="
                relative
                overflow-hidden
                bg-[#05060d]
                py-8
                sm:py-10
                md:py-12
                lg:py-16
            "
        >

            {/* =========================================================
                BACKGROUND
            ========================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-20
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
                    top-1/3
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
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-pink-600/10
                    blur-[120px]
                    sm:h-96
                    sm:w-96
                "
            />


            {/* =========================================================
                CONTAINER
            ========================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="max-w-3xl">

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-400
                            sm:text-sm
                            sm:tracking-[0.25em]
                        "
                    >
                        Projects
                    </p>

                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-black
                            leading-tight
                            text-white
                            sm:text-3xl
                            md:text-4xl
                            lg:text-5xl
                        "
                    >
                        Featured work
                    </h2>

                    <div
                        className="
                            mt-4
                            h-1
                            w-24
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            via-purple-500
                            to-pink-500
                        "
                    />

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-400
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        Some of the projects I have
                        built using modern
                        technologies.
                    </p>

                </div>


                {/* =====================================================
                    EMPTY
                ====================================================== */}

                {displayedProjects.length === 0 ? (
                    <div
                        className="
                            mt-12
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-8
                            text-center
                            text-slate-500
                            backdrop-blur-xl
                            sm:p-12
                        "
                    >
                        No projects available.
                    </div>
                ) : (

                    /* =================================================
                        GRID
                    ================================================== */

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-4
                            sm:mt-8
                            sm:grid-cols-2
                            lg:grid-cols-3
                            lg:gap-7
                            xl:gap-8
                        "
                    >

                        {displayedProjects.map(
                            (project) => (
                                <ProjectCard
                                    key={
                                        project.id
                                    }
                                    project={
                                        project
                                    }
                                    onOpen={() =>
                                        setSelectedProject(
                                            project
                                        )
                                    }
                                />
                            )
                        )}

                    </div>
                )}

            </div>


            {/* =========================================================
                DETAIL MODAL
            ========================================================== */}

            {selectedProject && (
                <ProjectDetailModal
                    project={
                        selectedProject
                    }
                    onClose={() =>
                        setSelectedProject(
                            null
                        )
                    }
                />
            )}

        </section>
    );
}


// =====================================================================
// PROJECT CARD
// =====================================================================

function ProjectCard({
    project,
    onOpen,
}) {
    const technologies =
        normalizeTechnologies(
            project.technologies
        );

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(event) => {
                if (
                    event.key ===
                    "Enter" ||
                    event.key ===
                    " "
                ) {
                    event.preventDefault();

                    onOpen();
                }
            }}
            className="
                group
                flex
                h-full
                min-w-0
                cursor-pointer
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#0a0d18]/90
                shadow-2xl
                shadow-black/30
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-purple-500/40
                hover:shadow-purple-900/20
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500/50
            "
        >

            {/* =====================================================
                IMAGE
            ====================================================== */}

            <div
                className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-gradient-to-br
                    from-blue-950
                    via-purple-950
                    to-pink-950
                "
            >

                {project.image ? (
                    <img
                        src={
                            project.image
                        }
                        alt={
                            project.title ||
                            "Project"
                        }
                        loading="lazy"
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-all
                            duration-700
                            group-hover:scale-105
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-slate-400
                        "
                    >
                        <Code2
                            size={54}
                            strokeWidth={1.4}
                        />
                    </div>
                )}

                {/* Image overlay */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/10
                        to-transparent
                    "
                />

                {/* =================================================
                    LIVE / FEATURED
                ================================================== */}

                {project.demo_url ? (
                    <span
                        className="
                            absolute
                            right-4
                            top-4
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-cyan-300/30
                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-600
                            to-purple-600
                            px-3
                            py-1.5
                            text-[10px]
                            font-bold
                            text-white
                            shadow-lg
                            shadow-cyan-500/25
                            sm:text-xs
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                animate-pulse
                                rounded-full
                                bg-red-500
                            "
                        />

                        Live
                    </span>
                ) : (
                    project.is_featured && (
                        <span
                            className="
                                absolute
                                right-4
                                top-4
                                rounded-full
                                border
                                border-purple-300/30
                                bg-purple-500/90
                                px-3
                                py-1.5
                                text-[10px]
                                font-bold
                                text-white
                                shadow-lg
                                shadow-purple-500/25
                                sm:text-xs
                            "
                        >
                            Featured
                        </span>
                    )
                )}

            </div>


            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-4
                    sm:p-5
                "
            >

                {/* Title */}

                <h3
                    className="
                        line-clamp-1
                        text-lg
                        font-bold
                        leading-7
                        text-white
                        transition
                        group-hover:text-purple-300
                        sm:text-xl
                    "
                    title={
                        project.title ||
                        ""
                    }
                >
                    {project.title ||
                        "Untitled Project"}
                </h3>


                {/* Description */}

                {project.short_description && (
                    <p
                        className="
                            mt-3
                            line-clamp-3
                            text-sm
                            leading-6
                            text-slate-400
                            sm:text-base
                            sm:leading-7
                        "
                    >
                        {
                            project.short_description
                        }
                    </p>
                )}


                {/* Technologies */}

                {technologies.length > 0 && (
                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                        "
                    >
                        {technologies
                            .slice(0, 8)
                            .map(
                                (
                                    technology,
                                    index
                                ) => (
                                    <span
                                        key={`${technology}-${index}`}
                                        className="
                                            rounded-full
                                            border
                                            border-blue-400/10
                                            bg-blue-400/10
                                            px-3
                                            py-1.5
                                            text-[10px]
                                            font-medium
                                            text-blue-300
                                            transition
                                            group-hover:border-purple-400/20
                                            group-hover:bg-purple-400/10
                                            sm:text-xs
                                        "
                                    >
                                        {
                                            technology
                                        }
                                    </span>
                                )
                            )}

                        {technologies.length >
                            8 && (
                                <span
                                    className="
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    font-medium
                                    text-slate-500
                                    sm:text-xs
                                "
                                >
                                    +
                                    {
                                        technologies.length -
                                        8
                                    }
                                </span>
                            )}
                    </div>
                )}


                {/* =================================================
                    META
                ================================================== */}

                <div
                    className="
                        mt-6
                        border-t
                        border-white/10
                        pt-5
                    "
                >
                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-4
                        "
                    >

                        <ProjectMeta
                            icon={UserRound}
                            label="Role"
                            value={
                                project.developer ||
                                project.role ||
                                "Developer"
                            }
                        />

                        <ProjectMeta
                            icon={CalendarDays}
                            label="Duration"
                            value={
                                project.duration ||
                                project.duration_text ||
                                project.period ||
                                "—"
                            }
                        />

                        <ProjectMeta
                            icon={Users}
                            label="Team"
                            value={
                                project.team ||
                                project.team_size ||
                                project.people ||
                                "—"
                            }
                        />

                    </div>
                </div>


                {/* =================================================
                    FOOTER
                ================================================== */}

                <div
                    className="
                        mt-5
                        border-t
                        border-white/10
                        pt-5
                        sm:pt-5
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        {/* View Project */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-slate-400
                                transition-colors
                                duration-300
                                group-hover:text-white
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    text-purple-400
                                    transition-all
                                    duration-300
                                    group-hover:border-purple-400/30
                                    group-hover:bg-purple-500/10
                                    group-hover:text-cyan-400
                                "
                            >
                                <Code2
                                    size={15}
                                />
                            </span>

                            <span>
                                View project
                            </span>
                        </div>


                        {/* Arrow */}

                        <span
                            className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.04]
                                text-slate-500
                                transition-all
                                duration-300
                                group-hover:translate-x-1
                                group-hover:border-purple-400/30
                                group-hover:bg-purple-500/10
                                group-hover:text-cyan-400
                            "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </span>
                    </div>


                    {/* Bottom accent */}

                    <div
                        className="
                            mt-4
                            h-[2px]
                            w-0
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            via-purple-500
                            to-pink-500
                            transition-all
                            duration-500
                            group-hover:w-full
                        "
                    />
                </div>

            </div>

        </article>
    );
}


// =====================================================================
// PROJECT META
// =====================================================================

function ProjectMeta({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div
            className="
                flex
                min-w-0
                items-center
                gap-2
            "
        >
            <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    text-slate-400
                "
            >
                <Icon size={14} />
            </div>

            <div className="min-w-0">

                <p
                    className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-600
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-0.5
                        truncate
                        text-xs
                        font-medium
                        text-slate-300
                    "
                    title={
                        String(value)
                    }
                >
                    {value}
                </p>

            </div>
        </div>
    );
}


// =====================================================================
// PROJECT DETAIL MODAL
// =====================================================================

function ProjectDetailModal({
    project,
    onClose,
}) {
    const technologies =
        normalizeTechnologies(
            project.technologies
        );

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-end
                justify-center
                bg-black/80
                p-2
                backdrop-blur-md
                sm:items-center
                sm:p-4
                lg:p-8
            "
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            {/* =================================================
                MODAL
            ================================================== */}

            <div
                className="
                    relative
                    flex
                    max-h-[95svh]
                    w-full
                    max-w-3xl
                    flex-col
                    overflow-hidden
                    rounded-t-3xl
                    border
                    border-white/10
                    bg-[#080b16]
                    shadow-2xl
                    shadow-purple-950/40
                    sm:rounded-3xl
                "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================================
                    CLOSE
                ================================================== */}

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close project details"
                    className="
                        absolute
                        right-4
                        top-4
                        z-20
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/50
                        text-slate-300
                        backdrop-blur-xl
                        transition
                        hover:border-pink-400/40
                        hover:bg-pink-500/10
                        hover:text-white
                    "
                >
                    <X size={20} />
                </button>


                {/* =================================================
                    SCROLLABLE CONTENT
                ================================================== */}

                <div
                    className="
                        overflow-y-auto
                    "
                >

                    {/* IMAGE */}

                    <div
                        className="
                            relative
                            aspect-[16/8]
                            w-full
                            overflow-hidden
                            bg-gradient-to-br
                            from-blue-950
                            via-purple-950
                            to-pink-950
                            sm:aspect-[16/7]
                        "
                    >
                        {project.image ? (
                            <img
                                src={
                                    project.image
                                }
                                alt={
                                    project.title ||
                                    "Project"
                                }
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    text-slate-500
                                "
                            >
                                <Code2
                                    size={70}
                                    strokeWidth={1.3}
                                />
                            </div>
                        )}

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-[#080b16]
                                via-transparent
                                to-transparent
                            "
                        />
                    </div>


                    {/* CONTENT */}

                    <div
                        className="
                            p-5
                            sm:p-7
                            lg:p-9
                        "
                    >

                        {/* TITLE */}

                        <h2
                            className="
                                max-w-4xl
                                text-lg
                                font-black
                                leading-tight
                                text-white
                                sm:text-xl
                                lg:text-2xl
                            "
                        >
                            {
                                project.title ||
                                "Untitled Project"
                            }
                        </h2>


                        {/* SHORT DESCRIPTION */}

                        {project.short_description && (
                            <p
                                className="
                                    mt-4
                                    max-w-4xl
                                    text-sm
                                    leading-6
                                    text-slate-400
                                    sm:text-base
                                    sm:leading-7
                                "
                            >
                                {
                                    project.short_description
                                }
                            </p>
                        )}


                        {/* =================================================
                            INFORMATION
                        ================================================== */}

                        <div
                            className="
                                mt-7
                                grid
                                grid-cols-2
                                gap-3
                                border-y
                                border-white/10
                                py-5
                                sm:grid-cols-3
                                sm:gap-5
                            "
                        >

                            <DetailMeta
                                icon={UserRound}
                                label="Developer"
                                value={
                                    project.developer ||
                                    project.role ||
                                    "Developer"
                                }
                            />

                            <DetailMeta
                                icon={CalendarDays}
                                label="Duration"
                                value={
                                    project.duration ||
                                    project.duration_text ||
                                    project.period ||
                                    "—"
                                }
                            />

                            <DetailMeta
                                icon={Users}
                                label="Team"
                                value={
                                    project.team ||
                                    project.team_size ||
                                    project.people ||
                                    "—"
                                }
                            />

                        </div>


                        {/* =================================================
                            TECHNOLOGIES
                        ================================================== */}

                        {technologies.length > 0 && (
                            <div className="mt-7">

                                <h3
                                    className="
                                        text-xs
                                        sm:text-sm
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-white
                                    "
                                >
                                    Technologies
                                </h3>

                                <div
                                    className="
                                        mt-3
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {technologies.map(
                                        (
                                            technology,
                                            index
                                        ) => (
                                            <span
                                                key={`${technology}-${index}`}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-blue-400/20
                                                    bg-blue-400/10
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    font-medium
                                                    text-blue-300
                                                "
                                            >
                                                {
                                                    technology
                                                }
                                            </span>
                                        )
                                    )}
                                </div>

                            </div>
                        )}


                        {/* =================================================
                            FULL DESCRIPTION
                        ================================================== */}

                        {project.description && (
                            <div className="mt-7">

                                <h3
                                    className="
                                        text-xs
                                        sm:text-sm
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-white
                                    "
                                >
                                    About this project
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        whitespace-pre-line
                                        text-sm
                                        leading-6
                                        text-slate-400
                                        sm:text-base
                                        sm:leading-7
                                    "
                                >
                                    {
                                        project.description
                                    }
                                </p>

                            </div>
                        )}


                        {/* =================================================
                            ACTIONS
                        ================================================== */}

                        <div className="mt-auto pt-6">
                            
                            {/* =================================================
                                BOTH LIVE DEMO + CODE
                            ================================================== */}

                            {project.demo_url &&
                                project.github_url && (
                                    <div
                                        className="
                                            grid
                                            grid-cols-1
                                            gap-3
                                            sm:grid-cols-2
                                        "
                                    >
                                        {/* Live Demo */}

                                        <a
                                            href={
                                                project.demo_url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                inline-flex
                                                min-h-12
                                                w-full
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                bg-gradient-to-r
                                                from-cyan-500
                                                via-blue-600
                                                to-purple-600
                                                px-4
                                                py-3
                                                text-sm
                                                font-bold
                                                text-white
                                                shadow-lg
                                                shadow-blue-500/20
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:shadow-xl
                                                hover:shadow-blue-500/30
                                                active:translate-y-0
                                            "
                                        >
                                            <ExternalLink
                                                size={18}
                                            />

                                            <span>
                                                Live Demo
                                            </span>
                                        </a>


                                        {/* Code */}

                                        <a
                                            href={
                                                project.github_url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                inline-flex
                                                min-h-12
                                                w-full
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-slate-300/70
                                                bg-white/[0.04]
                                                px-4
                                                py-3
                                                text-sm
                                                font-bold
                                                text-slate-300
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:border-purple-400/50
                                                hover:bg-purple-500/10
                                                hover:text-white
                                            "
                                        >
                                            <Code2
                                                size={19}
                                            />

                                            <span>
                                                Code
                                            </span>
                                        </a>
                                    </div>
                                )}


                            {/* =================================================
                                CODE ONLY
                            ================================================== */}

                            {!project.demo_url &&
                                project.github_url && (
                                    <a
                                        href={
                                            project.github_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            min-h-12
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-slate-300/70
                                            bg-white/[0.04]
                                            px-4
                                            py-3
                                            text-sm
                                            font-bold
                                            text-slate-300
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:border-purple-400/50
                                            hover:bg-purple-500/10
                                            hover:text-white
                                        "
                                    >
                                        <Code2
                                            size={19}
                                        />

                                        <span>
                                            Code
                                        </span>
                                    </a>
                                )}


                            {/* =================================================
                                LIVE DEMO ONLY
                            ================================================== */}

                            {project.demo_url &&
                                !project.github_url && (
                                    <a
                                        href={
                                            project.demo_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            min-h-12
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-cyan-500
                                            via-blue-600
                                            to-purple-600
                                            px-4
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            shadow-lg
                                            shadow-blue-500/20
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:shadow-xl
                                            hover:shadow-blue-500/30
                                        "
                                    >
                                        <ExternalLink
                                            size={18}
                                        />

                                        <span>
                                            Live Demo
                                        </span>
                                    </a>
                                )}


                            {/* =================================================
                                NO LINKS
                            ================================================== */}

                            {!project.demo_url &&
                                !project.github_url && (
                                    <div
                                        className="
                                            flex
                                            min-h-12
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/[0.03]
                                            px-4
                                            py-3
                                            text-sm
                                            font-medium
                                            text-slate-600
                                        "
                                    >
                                        No links available
                                    </div>
                                )}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


// =====================================================================
// DETAIL META
// =====================================================================

function DetailMeta({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                p-3
            "
        >

            <div
                className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/5
                    text-purple-400
                "
            >
                <Icon size={16} />
            </div>

            <div className="min-w-0">

                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-600
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-0.5
                        truncate
                        text-sm
                        font-medium
                        text-slate-300
                    "
                    title={
                        String(value)
                    }
                >
                    {value}
                </p>

            </div>

        </div>
    );
}


// =====================================================================
// TECHNOLOGIES
// =====================================================================

function normalizeTechnologies(
    technologies
) {
    if (
        Array.isArray(
            technologies
        )
    ) {
        return technologies
            .map(
                (item) =>
                    String(item).trim()
            )
            .filter(Boolean);
    }

    if (
        typeof technologies ===
        "string"
    ) {
        return technologies
            .split(",")
            .map(
                (item) =>
                    item.trim()
            )
            .filter(Boolean);
    }

    return [];
}