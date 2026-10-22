import {
    GraduationCap,
    CalendarDays,
    MapPin,
    ArrowUpRight,
} from "lucide-react";

export default function Education({
    educations = [],
}) {
    return (
        <section
            id="education"
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
                BACKGROUND GLOWS
            ========================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    top-16
                    h-64
                    w-64
                    rounded-full
                    bg-blue-600/15
                    blur-[100px]
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
                    -left-32
                    bottom-0
                    h-64
                    w-64
                    rounded-full
                    bg-purple-600/10
                    blur-[100px]
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
                    left-1/2
                    top-1/2
                    h-60
                    w-60
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-pink-600/5
                    blur-[120px]
                    sm:h-80
                    sm:w-80
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

                <div className="mx-auto max-w-7xl text-left">

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
                        Education
                    </p>

                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-black
                            leading-tight
                            text-white
                            sm:mt-3
                            sm:text-3xl
                            md:text-4xl
                            lg:text-5xl
                        "
                    >
                        Academic background
                    </h2>

                    <div
                        className="
                            mt-2
                            sm:mt-4
                            h-1
                            w-20
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            via-purple-500
                            to-pink-500
                            sm:w-24
                        "
                    />

                    <p
                        className="
                            mt-2
                            sm:mt-5
                            max-w-2xl
                            text-xs
                            leading-7
                            text-slate-400
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        My academic journey and educational
                        background.
                    </p>

                </div>


                {/* =====================================================
                    EMPTY STATE
                ====================================================== */}

                {educations.length === 0 ? (
                    <div
                        className="
                            mx-auto
                            mt-8
                            max-w-2xl
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-8
                            text-center
                            text-slate-500
                            backdrop-blur-xl
                            sm:mt-12
                            sm:p-12
                        "
                    >
                        <GraduationCap
                            size={40}
                            className="
                                mx-auto
                                mb-4
                                text-slate-600
                            "
                        />

                        <p>
                            No education records available.
                        </p>
                    </div>
                ) : (

                    /* =================================================
                        EDUCATION LIST
                    ================================================== */

                    <div
                        className="
                            relative
                            mt-8
                            sm:mt-12
                        "
                    >

                        {/* Desktop timeline */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-1/2
                                top-0
                                hidden
                                w-px
                                -translate-x-1/2
                                bg-gradient-to-b
                                from-cyan-400/30
                                via-purple-500/30
                                to-pink-500/30
                                lg:block
                            "
                        />

                        <div className="space-y-6 sm:space-y-8">

                            {educations.map(
                                (
                                    education,
                                    index
                                ) => (
                                    <EducationCard
                                        key={
                                            education.id
                                        }
                                        education={
                                            education
                                        }
                                        index={
                                            index
                                        }
                                    />
                                )
                            )}

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}


// =====================================================================
// EDUCATION CARD
// =====================================================================

function EducationCard({
    education,
    index,
}) {
    const isEven =
        index % 2 === 0;

    const startDate =
        formatDate(
            education.start_date
        );

    const endDate =
        education.end_date
            ? formatDate(
                education.end_date
            )
            : "Present";

    return (
        <div
            className={`
                relative
                lg:grid
                lg:grid-cols-2
                lg:gap-12
            `}
        >

            {/* =========================================================
                TIMELINE DOT
            ========================================================== */}

            <div
                className="
                    absolute
                    left-6
                    top-8
                    z-10
                    hidden
                    h-4
                    w-4
                    rounded-full
                    border-4
                    border-[#05060d]
                    bg-gradient-to-r
                    from-cyan-400
                    to-purple-500
                    shadow-lg
                    shadow-purple-500/30
                    lg:left-1/2
                    lg:block
                    lg:-translate-x-1/2
                "
            />


            {/* =========================================================
                DESKTOP SPACER
            ========================================================== */}

            <div
                className={`
                    hidden
                    lg:block
                    ${isEven ? "" : "lg:order-2"}
                `}
            />


            {/* =========================================================
                CARD
            ========================================================== */}

            <div
                className={`
                    group
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#0a0d18]/90
                    p-5
                    shadow-xl
                    shadow-black/20
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-purple-500/40
                    hover:shadow-purple-900/20
                    sm:p-7
                    lg:p-8
                    ${isEven ? "" : "lg:order-1"}
                `}
            >

                {/* Top accent */}

                <div
                    className="
                        absolute
                        left-0
                        top-0
                        h-1
                        w-0
                        bg-gradient-to-r
                        from-cyan-400
                        via-purple-500
                        to-pink-500
                        transition-all
                        duration-500
                        group-hover:w-full
                    "
                />


                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div
                    className="
                        flex
                        items-start
                        gap-4
                    "
                >

                    {/* Icon */}

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-gradient-to-br
                            from-cyan-400/10
                            via-purple-500/10
                            to-pink-500/10
                            text-cyan-400
                            transition
                            duration-300
                            group-hover:border-purple-400/30
                            group-hover:text-purple-300
                            sm:h-14
                            sm:w-14
                        "
                    >
                        <GraduationCap
                            size={24}
                            className="sm:h-7 sm:w-7"
                        />
                    </div>


                    {/* Main info */}

                    <div className="min-w-0 flex-1">

                        {/* Degree */}

                        <h3
                            className="
                                text-lg
                                font-bold
                                leading-6
                                text-white
                                transition-colors
                                group-hover:text-purple-300
                                sm:text-xl
                                sm:leading-7
                            "
                        >
                            {
                                education.degree ||
                                "Degree"
                            }
                        </h3>


                        {/* Field */}

                        {education.field_of_study && (
                            <p
                                className="
                                    mt-1
                                    text-xs
                                    font-medium
                                    text-cyan-400
                                    sm:text-base
                                "
                            >
                                {
                                    education.field_of_study
                                }
                            </p>
                        )}


                        {/* Institution */}

                        {education.institution && (
                            <div
                                className="
                                    mt-3
                                    flex
                                    min-w-0
                                    items-center
                                    gap-2
                                "
                            >
                                <MapPin
                                    size={15}
                                    className="
                                        shrink-0
                                        text-pink-400
                                    "
                                />

                                <span
                                    className="
                                        truncate
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        text-slate-300
                                    "
                                    title={
                                        education.institution
                                    }
                                >
                                    {
                                        education.institution
                                    }
                                </span>
                            </div>
                        )}

                    </div>


                    {/* Number */}

                    <span
                        className="
                            hidden
                            shrink-0
                            text-xs
                            font-bold
                            text-slate-700
                            sm:block
                        "
                    >
                        {String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )}
                    </span>

                </div>


                {/* =====================================================
                    DATE
                ====================================================== */}

                <div
                    className="
                        mt-5
                        inline-flex
                        max-w-full
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-3
                        py-1.5
                    "
                >

                    <CalendarDays
                        size={14}
                        className="
                            shrink-0
                            text-purple-400
                        "
                    />

                    <span
                        className="
                            truncate
                            text-xs
                            font-medium
                            text-slate-400
                            sm:text-sm
                        "
                    >
                        {startDate}
                        {" - "}
                        {endDate}
                    </span>

                </div>


                {/* =====================================================
                    DESCRIPTION
                ====================================================== */}

                {education.description && (
                    <p
                        className="
                            mt-5
                            whitespace-pre-line
                            text-xs
                            leading-7
                            text-slate-400
                            sm:text-base
                            sm:leading-8
                        "
                    >
                        {
                            education.description
                        }
                    </p>
                )}


                {/* =====================================================
                    BOTTOM
                ====================================================== */}

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        pt-4
                    "
                >

                    <span
                        className="
                            text-xs
                            font-medium
                            text-slate-600
                        "
                    >
                        Academic achievement
                    </span>

                    <span
                        className="
                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.03]
                            text-slate-500
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:border-purple-400/30
                            group-hover:bg-purple-500/10
                            group-hover:text-cyan-400
                        "
                    >
                        <ArrowUpRight
                            size={15}
                        />
                    </span>

                </div>

            </div>

        </div>
    );
}


// =====================================================================
// DATE
// =====================================================================

function formatDate(date) {
    if (!date) {
        return "";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}