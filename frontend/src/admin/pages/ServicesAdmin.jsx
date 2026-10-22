import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi("/admin/services");

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

function getIconUrl(icon) {
    if (!icon) {
        return null;
    }

    // Full URL returned by Laravel
    if (
        icon.startsWith("http://") ||
        icon.startsWith("https://")
    ) {
        return icon;
    }

    // /storage/icons/services/...
    if (icon.startsWith("/storage/")) {
        return `${STORAGE_URL}${icon.replace(
            "/storage",
            ""
        )}`;
    }

    // storage/icons/services/...
    if (icon.startsWith("storage/")) {
        return `${STORAGE_URL}/${icon.replace(
            "storage/",
            ""
        )}`;
    }

    // icons/services/...
    return `${STORAGE_URL}/${icon}`;
}

export default function ServicesAdmin() {
    return (
        <CrudPage
            title="Services"
            description="Manage the services displayed on your portfolio."
            api={api}
            columns={[
                {
                    key: "title",
                    label: "Title",
                },

                {
                    key: "icon",
                    label: "Icon",
                    render: (item) => {
                        const iconUrl =
                            getIconUrl(
                                item.icon
                            );

                        if (!iconUrl) {
                            return (
                                <span className="text-slate-500">
                                    —
                                </span>
                            );
                        }

                        return (
                            <img
                                src={iconUrl}
                                alt={
                                    item.title ||
                                    "Service icon"
                                }
                                className="
                                    h-8
                                    w-8
                                    rounded-lg
                                    object-contain
                                "
                                onError={(e) => {
                                    console.error(
                                        "Icon failed:",
                                        iconUrl
                                    );

                                    e.currentTarget.style.display =
                                        "none";
                                }}
                            />
                        );
                    },
                },

                {
                    key: "short_description",
                    label: "Description",
                    render: (item) => (
                        <div
                            className="
                                max-w-[280px]
                                truncate
                                whitespace-nowrap
                                text-slate-400
                            "
                            title={
                                item.short_description ||
                                ""
                            }
                        >
                            {item.short_description ||
                                "—"}
                        </div>
                    ),
                },

                {
                    key: "is_active",
                    label: "Active",
                    render: (item) =>
                        item.is_active
                            ? "Yes"
                            : "No",
                },
            ]}
            fields={[
                {
                    name: "title",
                    label: "Service Title",
                    required: true,
                    placeholder:
                        "Web Development",
                },

                {
                    name: "icon",
                    label: "Icon Name",
                    placeholder:
                        "Code2",
                    helpText:
                        "Optional. Example: Code2, Server, Database",
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
                    name: "short_description",
                    label: "Short Description",
                    fullWidth: true,
                    placeholder:
                        "Short description of this service",
                },

                {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                    rows: 6,
                    fullWidth: true,
                    placeholder:
                        "Detailed service description",
                },

                {
                    name: "is_active",
                    label: "Active",
                    type: "checkbox",
                    defaultValue: true,
                    checkboxLabel:
                        "Service is active",
                },
            ]}
        />
    );
}