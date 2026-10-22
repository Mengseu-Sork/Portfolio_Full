import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi(
    "/admin/social-links"
);

export default function SocialLinksAdmin() {
    return (
        <CrudPage
            title="Social Links"
            description="Manage your social media and external links."
            api={api}

            columns={[
                {
                    key: "platform",
                    label: "Platform",
                },

                {
                    key: "url",
                    label: "URL",
                    render: (item) => (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                block
                                max-w-[280px]
                                truncate
                                text-sm
                                text-cyan-400
                                hover:text-purple-400
                            "
                            title={item.url}
                        >
                            {item.url}
                        </a>
                    ),
                },

                {
                    key: "icon",
                    label: "Icon",

                    render: (item) => {
                        if (!item.icon) {
                            return (
                                <span className="text-slate-500">
                                    —
                                </span>
                            );
                        }

                        if (
                            typeof item.icon ===
                            "string" &&
                            (
                                item.icon.startsWith(
                                    "http://"
                                ) ||
                                item.icon.startsWith(
                                    "https://"
                                ) ||
                                item.icon.startsWith(
                                    "/storage/"
                                )
                            )
                        ) {
                            return (
                                <img
                                    src={
                                        item.icon
                                    }
                                    alt={
                                        item.platform ||
                                        "Social icon"
                                    }
                                    className="
                                        h-8
                                        w-8
                                        rounded-lg
                                        object-contain
                                    "
                                />
                            );
                        }

                        /*
                         * Handles:
                         * icons/social/facebook.png
                         */
                        if (
                            item.icon.startsWith(
                                "icons/"
                            ) ||
                            item.icon.startsWith(
                                "storage/"
                            )
                        ) {
                            const storageUrl =
                                import.meta.env
                                    .VITE_STORAGE_URL ||
                                "http://127.0.0.1:8000/storage";

                            const path =
                                item.icon.replace(
                                    /^storage\//,
                                    ""
                                );

                            return (
                                <img
                                    src={`${storageUrl}/${path}`}
                                    alt={
                                        item.platform ||
                                        "Social icon"
                                    }
                                    className="
                                        h-8
                                        w-8
                                        rounded-lg
                                        object-contain
                                    "
                                />
                            );
                        }

                        /*
                         * Old text icon
                         */
                        return (
                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-300
                                "
                            >
                                {item.icon}
                            </span>
                        );
                    },
                },

                {
                    key: "is_active",
                    label: "Active",
                    render: (item) =>
                        item.is_active ? (
                            <span
                                className="
                                    rounded-full
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    px-2.5
                                    py-1
                                    text-xs
                                    font-medium
                                    text-emerald-400
                                "
                            >
                                Active
                            </span>
                        ) : (
                            <span
                                className="
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-2.5
                                    py-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Inactive
                            </span>
                        ),
                },
            ]}

            fields={[
                {
                    name: "platform",
                    label: "Platform",
                    required: true,
                    placeholder: "GitHub",
                },

                {
                    name: "url",
                    label: "URL",
                    required: true,
                    placeholder:
                        "https://github.com/username",
                },

                {
                    name: "icon_file",
                    label: "Upload Icon",
                    type: "file",
                    accept:
                        "image/png,image/jpeg,image/webp",
                    maxSizeMb: 2,
                    helpText:
                        "PNG, JPG or WEBP • Maximum 2MB",
                    fullWidth: true,
                },

                {
                    name: "is_active",
                    label: "Active",
                    type: "checkbox",
                    defaultValue: true,
                    checkboxLabel:
                        "Social link is active",
                },
            ]}
        />
    );
}