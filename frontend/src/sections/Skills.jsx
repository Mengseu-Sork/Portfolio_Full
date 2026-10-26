import { Code2, Layers3 } from "lucide-react";

const CATEGORY_ORDER = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Tools & Technologies",
    "Soft Skill",
];

export default function Skills({
    skills = [],
}) {
    /*
     * Group skills by category.
     */
    const groupedSkills = groupByCategory(
        skills
    );

    return (
        <section
            id="skills"
            className="
                relative
                overflow-hidden
                bg-[#05060d]
                py-8
                sm:py-12
                md:py-16
                lg:py-20
            "
        >
            {/* =========================================
                BACKGROUND
            ========================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-64
                    w-64
                    -translate-x-1/2
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
                    bottom-0
                    right-0
                    h-60
                    w-60
                    rounded-full
                    bg-blue-600/10
                    blur-[100px]
                    sm:h-80
                    sm:w-80
                    lg:h-96
                    lg:w-96
                "
            />

            {/* =========================================
                CONTAINER
            ========================================== */}

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
                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="max-w-3xl">
                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-purple-400
                            sm:text-sm
                            sm:tracking-[0.25em]
                        "
                    >
                        Skills
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
                        My technical skills
                    </h2>

                    <div
                        className="
                            mt-3
                            h-1
                            w-20
                            rounded-full
                            bg-gradient-to-r
                            from-blue-400
                            via-purple-500
                            to-pink-500
                            sm:mt-4
                            sm:w-24
                        "
                    />
                </div>

                {/* =====================================
                    EMPTY STATE
                ====================================== */}

                {skills.length === 0 ? (
                    <div
                        className="
                            mt-10
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-8
                            text-center
                            text-gray-500
                            backdrop-blur-xl
                            sm:mt-12
                        "
                    >
                        No skills available.
                    </div>
                ) : (
                    <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">

                        {CATEGORY_ORDER.map(
                            (category) => {
                                const categorySkills =
                                    groupedSkills[
                                    category
                                    ] || [];

                                if (
                                    categorySkills.length ===
                                    0
                                ) {
                                    return null;
                                }

                                return (
                                    <SkillCategory
                                        key={
                                            category
                                        }
                                        title={
                                            category
                                        }
                                        skills={
                                            categorySkills
                                        }
                                    />
                                );
                            }
                        )}

                        {/* Any category not included in CATEGORY_ORDER */}
                        {Object.entries(
                            groupedSkills
                        )
                            .filter(
                                ([category]) =>
                                    !CATEGORY_ORDER.includes(
                                        category
                                    )
                            )
                            .map(
                                ([
                                    category,
                                    categorySkills,
                                ]) => (
                                    <SkillCategory
                                        key={
                                            category
                                        }
                                        title={
                                            category
                                        }
                                        skills={
                                            categorySkills
                                        }
                                    />
                                )
                            )}
                    </div>
                )}
            </div>
        </section>
    );
}


// =====================================================
// CATEGORY
// =====================================================

function SkillCategory({
    title,
    skills,
}) {
    return (
        <div>
            {/* Category heading */}

            <div className="flex items-center gap-3">
                <div
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-purple-500/20
                        bg-purple-500/10
                        text-purple-400
                        sm:h-10
                        sm:w-10
                    "
                >
                    <Layers3
                        size={18}
                    />
                </div>

                <div>
                    <h3
                        className="
                            text-xl
                            font-black
                            text-white
                            sm:text-2xl
                        "
                    >
                        {title}
                    </h3>

                    <div
                        className="
                            mt-1
                            h-[2px]
                            w-12
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            via-purple-500
                            to-pink-500
                        "
                    />
                </div>
            </div>

            {/* Skills */}

            <div
                className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                "
            >
                {skills.map(
                    (skill) => (
                        <SkillCard
                            key={
                                skill.id
                            }
                            skill={
                                skill
                            }
                        />
                    )
                )}
            </div>
        </div>
    );
}


// =====================================================
// SKILL CARD
// =====================================================

function SkillCard({
    skill,
}) {
    const percentage =
        Math.min(
            Math.max(
                Number(
                    skill.percentage
                ) || 0,
                0
            ),
            100
        );

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-purple-400/40
                hover:bg-white/[0.05]
                hover:shadow-xl
                hover:shadow-purple-900/20
                sm:p-6
            "
        >
            {/* Hover glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-purple-500/10
                    blur-2xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
            />

            <div className="relative">
                {/* Top */}

                <div className="flex items-center justify-between gap-3">

                    {/* Icon + name */}

                    <div className="flex min-w-0 items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-xl
                                border
                                border-white/10
                                bg-gradient-to-br
                                from-blue-500/10
                                via-purple-500/10
                                to-pink-500/10
                                text-cyan-400
                                sm:h-12
                                sm:w-12
                            "
                        >
                            {renderIcon(
                                skill.icon,
                                skill.name
                            )}
                        </div>

                        <div className="min-w-0">

                            <h4
                                className="
                                    truncate
                                    font-bold
                                    text-white
                                    text-sm
                                    sm:text-lg
                                "
                            >
                                {
                                    skill.name
                                }
                            </h4>

                        </div>
                    </div>

                    {/* Percentage */}

                    <span
                        className="
                            shrink-0
                            text-sm
                            font-bold
                            text-cyan-400
                        "
                    >
                        {percentage}%
                    </span>

                </div>

                {/* Progress */}

                <div
                    className="
                        mt-5
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-white/10
                    "
                >
                    <div
                        className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            via-purple-500
                            to-pink-500
                            transition-all
                            duration-1000
                            ease-out
                        "
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>

            </div>
        </div>
    );
}


// =====================================================
// GROUP BY CATEGORY
// =====================================================

function groupByCategory(
    skills
) {
    return skills.reduce(
        (groups, skill) => {
            const category =
                normalizeCategory(
                    skill.category
                );

            if (
                !groups[category]
            ) {
                groups[category] = [];
            }

            groups[category].push(
                skill
            );

            return groups;
        },
        {}
    );
}


// =====================================================
// CATEGORY NORMALIZER
// =====================================================

function normalizeCategory(
    category
) {
    if (!category) {
        return "Other";
    }

    const value =
        String(category)
            .trim()
            .toLowerCase();

    if (
        value === "language" ||
        value === "languages" ||
        value === "programming languages"
    ) {
        return "Languages";
    }

    if (
        value === "framework" ||
        value === "frameworks" ||
        value === "library" ||
        value === "libraries"
    ) {
        return "Frameworks";
    }

    if (
        value === "tool" ||
        value === "tools"
    ) {
        return "Tools";
    }

    if (
        value === "soft skill" ||
        value === "soft skills" ||
        value === "softskill" ||
        value === "softskills"
    ) {
        return "Soft Skill";
    }

    return category
        .trim()
        .replace(
            /\b\w/g,
            (letter) =>
                letter.toUpperCase()
        );
}


// =====================================================
// ICON
// =====================================================

function renderIcon(
    icon,
    name
) {
    if (!icon) {
        return (
            <Code2
                size={21}
            />
        );
    }

    /*
     * Uploaded icon image
     */
    if (
        typeof icon === "string" &&
        (
            icon.startsWith(
                "http://"
            ) ||
            icon.startsWith(
                "https://"
            ) ||
            icon.startsWith(
                "/storage/"
            )
        )
    ) {
        return (
            <img
                src={icon}
                alt={
                    `${name || "Skill"} icon`
                }
                loading="lazy"
                className="
                    h-7
                    w-7
                    object-contain
                    sm:h-8
                    sm:w-8
                "
                onError={(e) => {
                    e.currentTarget.style.display =
                        "none";

                    const parent =
                        e.currentTarget
                            .parentElement;

                    if (
                        parent &&
                        !parent.querySelector(
                            "svg"
                        )
                    ) {
                        const fallback =
                            document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "svg"
                            );

                        fallback.setAttribute(
                            "width",
                            "21"
                        );

                        fallback.setAttribute(
                            "height",
                            "21"
                        );

                        fallback.setAttribute(
                            "viewBox",
                            "0 0 24 24"
                        );

                        fallback.innerHTML =
                            `
                            <path
                                fill="currentColor"
                                d="M12 2 2 7v10l10 5 10-5V7L12 2Zm0 2.3 7.5 3.75L12 11.8 4.5 8.05 12 4.3Zm-8 5.4 7 3.5v6.25l-7-3.5V9.7Zm9 9.75V13.2l7-3.5v6.25l-7 3.5Z"
                            />
                        `;

                        parent.appendChild(
                            fallback
                        );
                    }
                }}
            />
        );
    }

    /*
     * If old data contains icon name,
     * display a simple fallback.
     */
    return (
        <span
            className="
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-cyan-400
            "
        >
            {String(icon).slice(
                0,
                4
            )}
        </span>
    );
}