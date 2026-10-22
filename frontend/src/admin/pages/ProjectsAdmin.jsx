import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi(
    "/admin/projects"
);

export default function ProjectsAdmin() {
    return (
        <CrudPage
            title="Projects"
            description="Manage your portfolio projects."
            api={api}

            // =====================================================
            // TABLE COLUMNS
            // =====================================================

            columns={[
                {
                    key: "title",
                    label: "Title",
                    render: (item) => (
                        <div
                            className="
                                max-w-[450px]
                                truncate
                                line-clamp-1
                                font-semibold
                                text-slate-200
                            "
                            title={
                                item.title || ""
                            }
                        >
                            {item.title || "—"}
                        </div>
                    ),
                },

                {
                    key: "image",
                    label: "Image",
                    render: (item) => {
                        if (!item.image) {
                            return (
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-slate-100
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    No image
                                </div>
                            );
                        }

                        return (
                            <img
                                src={
                                    item.image
                                }
                                alt={
                                    item.title ||
                                    "Project"
                                }
                                className="
                                    h-10
                                    w-14
                                    rounded-lg
                                    object-cover
                                "
                                onError={(e) => {
                                    e.currentTarget.style.display =
                                        "none";
                                }}
                            />
                        );
                    },
                },

                {
                    key: "technologies",
                    label: "Technologies",

                    render: (item) => {
                        let technologies = [];

                        // Array
                        if (
                            Array.isArray(
                                item.technologies
                            )
                        ) {
                            technologies =
                                item.technologies;
                        }

                        // String:
                        // "HTML, CSS, Laravel"
                        else if (
                            typeof item.technologies ===
                            "string"
                        ) {
                            const value =
                                item.technologies.trim();

                            if (value) {
                                // Try JSON first
                                try {
                                    const parsed =
                                        JSON.parse(value);

                                    if (
                                        Array.isArray(
                                            parsed
                                        )
                                    ) {
                                        technologies =
                                            parsed;
                                    } else {
                                        technologies =
                                            value
                                                .split(",")
                                                .map(
                                                    (tech) =>
                                                        tech.trim()
                                                )
                                                .filter(
                                                    Boolean
                                                );
                                    }
                                } catch {
                                    technologies =
                                        value
                                            .split(",")
                                            .map(
                                                (tech) =>
                                                    tech.trim()
                                            )
                                            .filter(
                                                Boolean
                                            );
                                }
                            }
                        }

                        if (
                            technologies.length ===
                            0
                        ) {
                            return (
                                <span className="text-slate-400">
                                    —
                                </span>
                            );
                        }

                        return (
                            <div
                                className="
                                    flex
                                    max-w-[380px]
                                    line-clamp-1
                                    flex-wrap
                                    gap-1.5
                                "
                            >
                                {technologies
                                    .slice(0, 6)
                                    .map(
                                        (
                                            technology,
                                            index
                                        ) => (
                                            <span
                                                key={`${technology}-${index}`}
                                                className="
                                                    inline-flex
                                                    rounded-full
                                                    border
                                                    border-blue-200
                                                    bg-blue-50
                                                    px-2.5
                                                    py-1
                                                    text-[11px]
                                                    font-medium
                                                    text-blue-600
                                                "
                                            >
                                                {technology}
                                            </span>
                                        )
                                    )}

                                {technologies.length >
                                    6 && (
                                        <span
                                            className="
                                                inline-flex
                                                rounded-full
                                                border
                                                border-slate-200
                                                bg-slate-100
                                                px-2.5
                                                py-1
                                                text-[11px]
                                                font-medium
                                                text-slate-500
                                            "
                                        >
                                            +
                                            {technologies.length -
                                                6}
                                        </span>
                                    )}
                            </div>
                        );
                    },
                },

                {
                    key: "developer",
                    label: "Role",
                    render: (item) =>
                        item.developer ||
                        "Developer",
                },

            ]}


            // =====================================================
            // FORM
            // =====================================================

            fields={[
                // ---------------------------------------------
                // TITLE
                // ---------------------------------------------

                {
                    name: "title",
                    label: "Project Title",
                    required: true,
                    placeholder:
                        "Leave Management System",
                },




                // ---------------------------------------------
                // DEVELOPER
                // ---------------------------------------------

                {
                    name: "developer",
                    label: "Developer / Role",
                    placeholder:
                        "Developer",
                },


                // ---------------------------------------------
                // PROJECT IMAGE
                // ---------------------------------------------

                {
                    name: "image",
                    label: "Project Image",
                    type: "file",
                    accept:
                        "image/jpeg,image/png,image/webp",
                    maxSizeMb: 5,
                    helpText:
                        "JPG, PNG or WEBP • Maximum 5MB",
                    fullWidth: true,
                },


                // ---------------------------------------------
                // SHORT DESCRIPTION
                // ---------------------------------------------

                {
                    name: "short_description",
                    label: "Short Description",
                    placeholder:
                        "Centralized leave management with automation, real-time tracking, and easy mobile access.",
                    fullWidth: true,
                },


                // ---------------------------------------------
                // DESCRIPTION
                // ---------------------------------------------

                {
                    name: "description",
                    label: "Full Description",
                    type: "textarea",
                    rows: 7,
                    placeholder:
                        "Write the full project description...",
                    fullWidth: true,
                },


                // ---------------------------------------------
                // TECHNOLOGIES
                // ---------------------------------------------

                {
                    name: "technologies",
                    label: "Technologies",
                    placeholder:
                        "HTML, CSS, JavaScript, Laravel, MySQL, Git",
                    helpText:
                        "Separate each technology with a comma.",
                    fullWidth: true,
                },


                // ---------------------------------------------
                // DURATION
                // ---------------------------------------------

                {
                    name: "duration",
                    label: "Duration",
                    placeholder:
                        "1 month",
                },


                // ---------------------------------------------
                // TEAM
                // ---------------------------------------------

                {
                    name: "team",
                    label: "Team",
                    placeholder:
                        "4 people",
                },


                // ---------------------------------------------
                // GITHUB
                // ---------------------------------------------

                {
                    name: "github_url",
                    label: "GitHub URL",
                    placeholder:
                        "https://github.com/username/project",
                },


                // ---------------------------------------------
                // DEMO
                // ---------------------------------------------

                {
                    name: "demo_url",
                    label: "Live Demo URL",
                    placeholder:
                        "https://example.com",
                },


                // ---------------------------------------------
                // FEATURED
                // ---------------------------------------------

                {
                    name: "is_featured",
                    label: "Featured",
                    type: "checkbox",
                    defaultValue: false,
                    checkboxLabel:
                        "Show this project as featured",
                },


                // ---------------------------------------------
                // ACTIVE
                // ---------------------------------------------

                {
                    name: "is_active",
                    label: "Active",
                    type: "checkbox",
                    defaultValue: true,
                    checkboxLabel:
                        "Show this project on the portfolio",
                },
            ]}


            // =====================================================
            // TRANSFORM DATA
            // =====================================================

            transformBeforeSubmit={(
                payload
            ) => {
                const data = {
                    ...payload,
                };

                /*
                 * Convert comma-separated technologies
                 * into an array for PostgreSQL JSONB.
                 *
                 * Example:
                 *
                 * "React, Laravel, PostgreSQL"
                 *
                 * becomes:
                 *
                 * [
                 *   "React",
                 *   "Laravel",
                 *   "PostgreSQL"
                 * ]
                 */

                if (
                    typeof data.technologies ===
                    "string"
                ) {
                    data.technologies =
                        data.technologies
                            .split(",")
                            .map(
                                (item) =>
                                    item.trim()
                            )
                            .filter(
                                Boolean
                            );
                }

                return data;
            }}


            // =====================================================
            // TRANSFORM RESPONSE
            // =====================================================

            transformResponse={(data) => {
                return data.map(
                    (item) => ({
                        ...item,

                        /*
                         * CrudPage edit form uses
                         * the actual field value.
                         *
                         * Convert the API array back
                         * into comma-separated text
                         * for the form input.
                         */
                        technologies:
                            Array.isArray(
                                item.technologies
                            )
                                ? item.technologies.join(
                                    ", "
                                )
                                : item.technologies ||
                                "",
                    })
                );
            }}
        />
    );
}